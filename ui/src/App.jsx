import { useState, useEffect } from "react";
import './App.css'

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [showingNote, setShowingNote] = useState("");

  useEffect(() => {
    window.electron.getNotes().then(setNotes);
  }, []);

  const addNote = async () => {
    if (!note.trim()) return;
    const updatedNotes = await window.electron.addNote(note);
    setNotes(updatedNotes);
    setNote("");
  };

  const deleteNote = async (index) => {
    const updatedNotes = await window.electron.deleteNote(index);
    setNotes(updatedNotes);
  };

  const setShowNote = (index) => {
    const showNote = notes[index];
    setShowingNote(showNote);
  }

  return (
    <div style={{ display: "flex", height: "80vh", width:"900px", margin:"2rem auto", justifyContent:"space-between", padding:"2rem", border:"1px solid rgb(224, 224, 224)", borderRadius:"20px"}}>
      {/* Sidebar */}
      <div style={{ 
        minWidth: "30%",
        borderRight: "1px solid #f5f5f5",
        padding: "20px",
        backgroundColor: "#f5f5f5"
      }}>
        <h2>Notlar</h2>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Bir not girin..."
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd"
            }}
          />
          <button 
            onClick={addNote}
            style={{
              width: "100%",
              padding: "8px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Not Ekle
          </button>
        </div>
        <div style={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 200px)"
        }}>
          {notes.map((n, i) => (
            <div 
              key={i}
              style={{
                padding: "10px",
                marginBottom: "8px",
                backgroundColor: "white",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer"
              }}
              onClick={() => setShowNote(i)}
            >
              <span style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "180px"
              }}>{n}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(i);
                }}
                style={{
                  backgroundColor: "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  cursor: "pointer",
                  marginLeft: "8px",
                  flexShrink: 0
                }}
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex:1,padding: "20px", border:"1px solid #f5f5f5", borderRadius:"20px" }}>
        <h3>Not Detayları</h3>
        {showingNote ? (
          <p style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{showingNote}</p>
        ) : (
          <p>Görüntülemek için bir not seçin</p>
        )}
      </div>
    </div>
  );
}

export default App
