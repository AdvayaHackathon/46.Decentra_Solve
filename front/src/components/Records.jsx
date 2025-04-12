import { useState, useEffect } from "react";
import { Lock, Upload, FileText, Download, Shield, Server } from "lucide-react";
import axios from "axios"; // Make sure to install axios if using this import
import { ethers } from "ethers"; // Make sure to install ethers if using this import
import IPFSStorageABI from "../contracts/IPFSStorageABI.json"; // Adjust path as needed
import BackButton from './BackButton';

const CONTRACT_ADDRESS = "0x5e4eF91Fc8061B04815d35c582eAe944603c9bFe";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("uploadedFiles");
    if (stored) setUploadedFiles(JSON.parse(stored));
  }, []);

  const generateAESKey = async () => {
    return await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
  };

  const encryptFile = async (fileBuffer, aesKey, iv) => {
    return await crypto.subtle.encrypt({ name: "AES-GCM", iv }, aesKey, fileBuffer);
  };

  const exportAESKey = async (key) => {
    const raw = await crypto.subtle.exportKey("raw", key);
    return btoa(String.fromCharCode(...new Uint8Array(raw))); // Base64
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file first!");
    
    setIsUploading(true);

    try {
      const aesKey = await generateAESKey();
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const fileBuffer = await file.arrayBuffer();
      const encryptedData = await encryptFile(fileBuffer, aesKey, iv);
      const aesRawKey = await exportAESKey(aesKey);
      const ivBase64 = btoa(String.fromCharCode(...iv));

      const encryptedBlob = new Blob([
        iv,
        new Uint8Array(await crypto.subtle.exportKey("raw", aesKey)),
        new Uint8Array(encryptedData)
      ]);

      const formData = new FormData();
      formData.append("file", encryptedBlob, file.name + ".enc");

      // Using axios for the upload
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
          "Content-Type": "multipart/form-data",
        },
      });

      const ipfsHash = res.data.IpfsHash;
      const fileUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const signer = await provider.getSigner();
        const network = await provider.getNetwork();
        if (Number(network.chainId) !== 17000) {
          alert("Please switch to Holesky Testnet.");
          setIsUploading(false);
          return;
        }
        const contract = new ethers.Contract(CONTRACT_ADDRESS, IPFSStorageABI, signer);
        const tx = await contract.storeFile(ipfsHash, file.name + ".enc");
        await tx.wait();
      } else {
        alert("MetaMask not detected.");
        setIsUploading(false);
        return;
      }

      const newEntry = {
        name: file.name,
        url: fileUrl,
        key: aesRawKey,
        iv: ivBase64,
        date: new Date().toLocaleString()
      };

      const updated = [...uploadedFiles, newEntry];
      setUploadedFiles(updated);
      localStorage.setItem("uploadedFiles", JSON.stringify(updated));
      setFile(null);
      setFileName("");
      alert("✅ File encrypted, uploaded, and recorded on-chain!");
    } catch (err) {
      console.error("Encryption/upload failed:", err);
      alert("❌ Failed to upload or encrypt file.");
    } finally {
      setIsUploading(false);
    }
  };

  const decryptAndDownload = async (file) => {
    try {
      const res = await fetch(file.url);
      const blob = await res.blob();
      const buffer = await blob.arrayBuffer();

      const iv = Uint8Array.from(atob(file.iv), c => c.charCodeAt(0));
      const rawKey = Uint8Array.from(atob(file.key), c => c.charCodeAt(0));

      const aesKey = await crypto.subtle.importKey(
        "raw", rawKey, { name: "AES-GCM" }, false, ["decrypt"]
      );

      const totalIvLen = 12;
      const totalKeyLen = 32;
      const encryptedData = buffer.slice(totalIvLen + totalKeyLen);

      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        aesKey,
        encryptedData
      );

      const blobOut = new Blob([decryptedBuffer]);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blobOut);
      a.download = file.name;
      a.click();
    } catch (err) {
      console.error("Decryption failed:", err);
      alert("❌ Decryption failed. Check keys or file integrity.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col items-center justify-start px-4 py-12">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-6">
          <BackButton />
        </div>
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-pink-600 flex items-center justify-center gap-2">
            <Shield className="w-8 h-8" /> Encrypted File Storage
          </h1>
          <p className="text-pink-400 mt-2">Secure, encrypted, blockchain-verified storage</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-pink-100">
            <h2 className="text-xl font-bold text-pink-700 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" /> Encrypt & Upload
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-2 border-dashed border-pink-200 rounded-xl p-6 hover:border-pink-400 transition-colors cursor-pointer bg-pink-50">
                <input 
                  type="file" 
                  id="fileInput"
                  onChange={handleFileChange}
                  className="hidden" 
                />
                <label 
                  htmlFor="fileInput" 
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Upload className="w-10 h-10 text-pink-500 mb-2" />
                  <span className="text-pink-700 font-medium text-lg">
                    {fileName || "Choose a file"}
                  </span>
                  <p className="text-pink-400 text-sm mt-1">
                    Click to browse or drag & drop
                  </p>
                </label>
              </div>
              
              <div className="text-sm text-pink-600 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>File will be encrypted before uploading</span>
              </div>
              
              <button
                type="submit"
                disabled={!file || isUploading}
                className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-colors ${
                  !file || isUploading 
                    ? "bg-pink-300 cursor-not-allowed" 
                    : "bg-pink-600 hover:bg-pink-700"
                }`}
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Encrypt & Upload
                  </>
                )}
              </button>
              
              <div className="flex justify-between text-xs text-pink-400 mt-2">
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3" /> AES-256 Encryption
                </div>
                <div className="flex items-center gap-1">
                  <Server className="w-3 h-3" /> IPFS & Blockchain
                </div>
              </div>
            </form>
          </div>
          
          {/* Files Section */}
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-pink-100">
            <h2 className="text-xl font-bold text-pink-700 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Your Files
            </h2>
            
            <div className="overflow-y-auto max-h-96 pr-1">
              {uploadedFiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <FileText className="w-12 h-12 text-pink-200 mb-2" />
                  <p className="text-pink-400">No encrypted files yet</p>
                  <p className="text-pink-300 text-sm mt-1">Upload a file to get started</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {uploadedFiles.map((f, i) => (
                    <div
                      key={i}
                      className="bg-pink-50 rounded-lg p-4 hover:bg-pink-100 transition-colors border border-pink-100"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-pink-600" />
                          <span className="font-medium text-pink-700 truncate max-w-[150px]">
                            {f.name}
                          </span>
                        </div>
                        <span className="text-xs text-pink-400">
                          {f.date || "Encrypted"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between mt-2">
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-pink-600 hover:text-pink-800 transition-colors flex items-center gap-1"
                        >
                          <Server className="w-3 h-3" /> View on IPFS
                        </a>
                        <button
                          onClick={() => decryptAndDownload(f)}
                          className="bg-pink-500 hover:bg-pink-600 text-white text-xs py-1 px-3 rounded-md transition-colors flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" /> Decrypt
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-pink-400 text-sm">
          <p>Files are encrypted locally before being stored on IPFS with blockchain verification</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;