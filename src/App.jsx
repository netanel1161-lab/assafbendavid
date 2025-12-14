import React, { useState, useEffect, useRef } from 'react';
import { 
  Folder, 
  Layout, 
  Phone, 
  CheckSquare, 
  Plus, 
  X, 
  Check, 
  ExternalLink, 
  Image as ImageIcon,
  User,
  Globe,
  Mail,
  Facebook,
  Instagram,
  FileText,
  Edit2,
  Save,
  Trash2,
  PlayCircle,
  MessageCircle,
  Smartphone,
  BarChart2,
  TrendingUp,
  Users,
  Target,
  Send,
  Eye
} from 'lucide-react';

// --- הגדרות כלליות ---

// לוגו הדוגמה (באתר אמיתי מומלץ להחליף לקישור הישיר שמסתיים ב-.jpg/.png)
const BRAND_LOGO = "/media/images/logo.svg";
const BRAND_NAME = "ASSAF BEN DAVID - ADV";
const MY_PHONE_NUMBER = "972508504833"; // המספר שלך לשליחת התזכורות

const DEFAULT_STAGES_TEMPLATE = [
  "תכנון אסטרטגי",
  "קופירייטינג",
  "אישור ויזואלי",
  "יום צילום",
  "עריכה ופוסט"
];

const NUKA_LOGO = "/media/images/518251013_17953274969983339_6813015775964785767_n.jpg";

const INITIAL_CLIENTS = [
  {
    id: 1,
    name: "מסעדת נוקה",
    type: "מסעדה",
    logo: NUKA_LOGO,
    contact: {
      phone: "050-9999999",
      email: "nuka@restaurant.com",
      website: "/nuka.html",
      instagram: "nuka_tlv",
      facebook: "Nuka Restaurant",
      notes: "מסעדה אסיאתית יוקרתית. חשוב לשמור על שפה עיצובית מינימליסטית."
    },
    links: [
      { id: 1, name: "תפריט קיץ 2025", url: "#", tag: "תפריטים", type: "pdf" }
    ],
    project: {
      isActive: true,
      name: "השקת תפריט ערב",
      currentStageIndex: 1,
      stages: [
        { name: "בניית קונספט", assignee: "רון קריאייטיב", note: "אושר הקונספט הכהה", isApproved: true, stickyNotes: [], dueDate: "", dueTime: "" },
        { name: "צילום מנות", assignee: "דנה הפקות", note: "תיאום צלם לשבוע הבא", isApproved: false, stickyNotes: [], dueDate: "", dueTime: "" },
        { name: "עיצוב תפריט", assignee: "עידן עיצוב", note: "", isApproved: false, stickyNotes: [], dueDate: "", dueTime: "" },
        { name: "הדפסה והפצה", assignee: "", note: "", isApproved: false, stickyNotes: [], dueDate: "", dueTime: "" }
      ]
    },
    tasks: [],
    results: {
      followers: 245,
      leads: 1845,
      reach: 15000,
      engagement: "12%"
    }
  },
  {
    id: 2,
    name: "המקסיקני",
    type: "מסעדה",
    logo: "https://eilat.city/images/6035-8827-%D7%94%D7%9E%D7%A7%D7%A1%D7%99%D7%A7%D7%A0%D7%99-(%D7%9E%D7%AA%D7%97%D7%9D-%D7%91%D7%99%D7%92)-%D7%90%D7%99%D7%9C%D7%AA-md.jpg",
    contact: {
      phone: "08-6333333",
      email: "hola@mexicani.co.il",
      website: "https://www.mexicani.co.il",
      instagram: "hamexicani",
      facebook: "המקסיקני הרשמי",
      notes: "רשת מזון מהיר. צריכים תוכן קצבי לטיקטוק ואינסטגרם."
    },
    links: [],
    project: null,
    tasks: [],
    results: {
      followers: 0,
      leads: 0,
      reach: 0,
      engagement: "0%"
    }
  }
];

const TEAM_MEMBERS = [
  "קים סושיאל",
  "רון קריאייטיב",
  "דנה הפקות",
  "עידן עיצוב",
  "מנהל תיק ראשי"
];

// --- קומפוננטה ראשית ---

const applyMigrations = (clientsList) => {
  return clientsList.map((client) => {
    if (client.id === 1 && client.logo !== NUKA_LOGO) {
      return { ...client, logo: NUKA_LOGO };
    }
    return client;
  });
};

export default function App() {
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('agencyClientsV3');
    const base = saved ? JSON.parse(saved) : INITIAL_CLIENTS;
    return applyMigrations(base);
  });

  const [selectedClientId, setSelectedClientId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialModalTab, setInitialModalTab] = useState('project');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [confirmData, setConfirmData] = useState(null); // { message, onConfirm }

  useEffect(() => {
    localStorage.setItem('agencyClientsV3', JSON.stringify(clients));
  }, [clients]);

  const handleClientClick = (id, initialTab = 'project') => {
    setSelectedClientId(id);
    setInitialModalTab(initialTab);
    setIsModalOpen(true);
  };

  const closeConfirm = () => setConfirmData(null);

  const deleteClient = (clientId, clientName) => {
    setDeleteTarget({ id: clientId, name: clientName });
  };

  const updateClientData = (clientId, newData) => {
    setClients(prev => prev.map(client => 
      client.id === clientId ? { ...client, ...newData } : client
    ));
  };

  const createNewClient = () => {
    setNewClientName("");
    setIsAddOpen(true);
  };

  const handleCreateClient = () => {
    const name = newClientName.trim();
    if (!name) return;
    const newClient = {
      id: Date.now(),
      name: name,
      type: "",
      logo: "https://via.placeholder.com/200?text=" + name.charAt(0),
      contact: { phone: "", email: "", website: "", instagram: "", facebook: "", notes: "" },
      links: [],
      project: null,
      tasks: [],
      results: { followers: 0, leads: 0, reach: 0, engagement: "0%" }
    };
    setClients([...clients, newClient]);
    setIsAddOpen(false);
    setNewClientName("");
  };

  const selectedClient = clients.find(c => c.id === selectedClientId);

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-gray-800 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* לוגו בעיגול ליד השם */}
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-100 shadow-sm">
                    <img src={BRAND_LOGO} alt="Logo" className="w-10 h-10 object-contain" />
                </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase">{BRAND_NAME}</h1>
              <p className="text-slate-500 text-xs font-medium">ניהול לקוחות מתקדם</p>
            </div>
          </div>
          <button 
            onClick={createNewClient}
            className="bg-black text-white px-5 py-2.5 rounded-full hover:bg-slate-800 flex items-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm font-bold"
          >
            <Plus size={16} />
            הוסף לקוח
          </button>
        </div>
      </header>

      {/* Grid of Clients */}
      <main className="max-w-7xl mx-auto p-6 flex-1 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {clients.map(client => (
            <div 
              key={client.id} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full"
              onClick={() => handleClientClick(client.id)}
            >
              <div className="h-40 bg-gray-200 relative overflow-hidden">
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                 <img 
                   src={client.logo} 
                   alt={client.name} 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                   onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'}}
                 />
              </div>

              <div className="p-6 text-center -mt-10 relative z-20 flex-1 flex flex-col">
                <div className="w-20 h-20 bg-white rounded-full p-1.5 mx-auto shadow-lg mb-3">
                  <img 
                    src={client.logo} 
                    alt="logo" 
                    className="w-full h-full rounded-full object-cover" 
                    onError={(e) => {e.target.src = 'https://via.placeholder.com/100?text=Icon'}}
                  />
                </div>

                <h3 className="font-bold text-xl text-gray-800 mb-1">{client.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{client.type || "ללא קטגוריה"}</p>

                {client.project ? (
                  <div className="mt-2 mb-4">
                     <span className="text-xs font-semibold bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100">
                       פרויקט פעיל
                     </span>
                     <p className="text-sm text-gray-500 mt-2 line-clamp-1">{client.project.name}</p>
                  </div>
                ) : (
                  <div className="mt-2 mb-4">
                    <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                       אין פרויקט
                    </span>
                    <p className="text-sm text-gray-400 mt-2">--</p>
                  </div>
                )}

                <div className="mt-auto flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleClientClick(client.id); }}
                    className="flex-grow py-2.5 bg-slate-900 text-white font-medium rounded-xl transition-colors text-sm hover:bg-slate-700 flex items-center justify-center gap-2">
                    <Eye size={14} />
                    ניהול תיק
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleClientClick(client.id, 'info'); }}
                    className="p-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
                    title="עריכת פרטי עסק"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteClient(client.id, client.name);
                    }}
                    className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                    title="מחק לקוח"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Client Modal */}
      {isModalOpen && selectedClient && (
        <ClientModal 
          client={selectedClient} 
          initialTab={initialModalTab}
          onClose={() => setIsModalOpen(false)} 
          onUpdate={(data) => updateClientData(selectedClient.id, data)}
          openConfirm={(payload) => setConfirmData(payload)}
        />
      )}

      {/* Add Client Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-black text-gray-800">הוספת לקוח חדש</h3>
                <p className="text-sm text-gray-500 mt-1">הזן שם ברור כדי שתזהה אותו בקלות.</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600" onClick={() => setIsAddOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <label className="text-xs font-bold text-gray-500 mb-2 block uppercase">שם הלקוח</label>
            <input
              autoFocus
              type="text"
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              className="w-full p-3 rounded-2xl border border-gray-200 bg-gray-50 focus:border-blue-500 outline-none"
              placeholder='למשל: "מסעדת נוקה" או "קמפיין X"'
            />

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleCreateClient}
                disabled={!newClientName.trim()}
                className="flex-1 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                צור לקוח
              </button>
              <button
                onClick={() => setIsAddOpen(false)}
                className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-black text-gray-800">מחיקת לקוח</h3>
              <button className="text-gray-400 hover:text-gray-600" onClick={() => setDeleteTarget(null)}>
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              האם למחוק את <span className="font-bold text-gray-800">"{deleteTarget.name}"</span>? הפעולה מסירה את הלקוח מהרשימה.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setClients(prev => prev.filter(c => c.id !== deleteTarget.id));
                  setDeleteTarget(null);
                }}
                className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all"
              >
                מחיקה סופית
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm dialog (generic) */}
      {confirmData && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5 border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-lg font-black text-gray-800">אישור פעולה</h4>
              <button className="text-gray-400 hover:text-gray-600" onClick={closeConfirm}>
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-5">{confirmData.message}</p>
            <div className="flex gap-2">
              <button
                onClick={() => { confirmData.onConfirm(); closeConfirm(); }}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
              >
                אישור
              </button>
              <button
                onClick={closeConfirm}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- המודל הראשי ---

function ClientModal({ client, onClose, onUpdate, initialTab = 'project', openConfirm }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, client.id]);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-6 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-5">
            <img src={client.logo} alt="logo" className="w-16 h-16 rounded-2xl object-cover shadow-md border border-gray-100" />
            <div>
              <h2 className="text-3xl font-black text-gray-800">{client.name}</h2>
              <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                {client.project ? (
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    פרויקט: {client.project.name}
                  </span>
                ) : (
                  <span className="text-gray-400">לא הוגדר פרויקט</span>
                )}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={24} />
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-gray-200 bg-white px-6 overflow-x-auto">
          <TabButton id="links" icon={Folder} label="1. קבצים וקישורים" active={activeTab} onClick={setActiveTab} />
          <TabButton id="project" icon={Layout} label="2. ניהול פרויקט" active={activeTab} onClick={setActiveTab} />
          <TabButton id="info" icon={Phone} label="3. פרטי עסק" active={activeTab} onClick={setActiveTab} />
          <TabButton id="tasks" icon={CheckSquare} label="4. אישור ביצוע" active={activeTab} onClick={setActiveTab} />
          <TabButton id="results" icon={BarChart2} label="5. תוצאות החודש" active={activeTab} onClick={setActiveTab} />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/80">

          {activeTab === 'links' && (
            <LinksTab links={client.links} onUpdate={(links) => onUpdate({ ...client, links })} openConfirm={openConfirm} />
          )}

          {activeTab === 'project' && (
            <ProjectTab 
              project={client.project} 
              onUpdate={(project) => onUpdate({ ...client, project })} 
            />
          )}

          {activeTab === 'info' && (
            <InfoTab contact={client.contact} onUpdate={(contact) => onUpdate({ ...client, contact })} />
          )}

          {activeTab === 'tasks' && (
            <VerificationTab 
              tasks={client.tasks || []}
              onUpdateTasks={(tasks) => onUpdate({ ...client, tasks })}
            />
          )}

          {activeTab === 'results' && (
             <ResultsTab 
               results={client.results || { followers: 0, leads: 0, reach: 0, engagement: "0%" }}
               onUpdate={(results) => onUpdate({ ...client, results })}
             />
          )}

        </div>
      </div>
    </div>
  );
}

// --- טאב 5: תוצאות (חדש) ---
function ResultsTab({ results, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempResults, setTempResults] = useState(results);

  const saveResults = () => {
    onUpdate(tempResults);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
       <div className="flex justify-between items-center mb-8">
         <div>
            <h3 className="text-2xl font-bold text-gray-800">דוח ביצועים חודשי</h3>
            <p className="text-gray-500">מדדי צמיחה ונתונים עיקריים</p>
         </div>
         <button 
           onClick={() => isEditing ? saveResults() : setIsEditing(true)}
           className={`px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${isEditing ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'}`}
         >
           {isEditing ? <Save size={18}/> : <Edit2 size={18}/>}
           {isEditing ? 'שמור נתונים' : 'עדכן נתונים'}
         </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <ResultCard 
           icon={Users} title="עוקבים חדשים" 
           value={tempResults.followers} 
           color="blue"
           isEditing={isEditing}
           onChange={(v) => setTempResults({...tempResults, followers: v})}
         />
         <ResultCard 
           icon={Target} title="לידים החודש" 
           value={tempResults.leads} 
           color="purple"
           isEditing={isEditing}
           onChange={(v) => setTempResults({...tempResults, leads: v})}
         />
         <ResultCard 
           icon={Globe} title="חשיפה (Reach)" 
           value={tempResults.reach} 
           color="green"
           isEditing={isEditing}
           onChange={(v) => setTempResults({...tempResults, reach: v})}
         />
         <ResultCard 
           icon={TrendingUp} title="מעורבות (Engage)" 
           value={tempResults.engagement} 
           color="orange"
           isEditing={isEditing}
           onChange={(v) => setTempResults({...tempResults, engagement: v})}
         />
       </div>

       {/* גרף דמה ויזואלי להשלמת המראה */}
       <div className="mt-8 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
         <h4 className="text-lg font-bold text-gray-800 mb-4">מגמת צמיחה (חצי שנתית)</h4>
         <div className="h-48 flex items-end justify-between gap-2 px-4">
            {[40, 65, 45, 80, 70, 95, 85, 100].map((h, i) => (
              <div key={i} className="w-full bg-blue-50 rounded-t-lg relative group overflow-hidden" style={{height: `${h}%`}}>
                <div className="absolute bottom-0 left-0 right-0 bg-blue-500 h-0 group-hover:h-full transition-all duration-700 opacity-20"></div>
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-500 rounded-t-lg"></div>
              </div>
            ))}
         </div>
       </div>
    </div>
  );
}

function ResultCard({ icon: Icon, title, value, color, isEditing, onChange }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    green: "bg-green-50 text-green-600 border-green-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
  };

  return (
    <div className={`p-6 rounded-2xl border-2 transition-all ${colors[color]} ${isEditing ? 'border-dashed' : 'border-transparent shadow-sm'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white rounded-xl shadow-sm"><Icon size={24} /></div>
      </div>
      <div className="text-sm font-bold opacity-70 mb-1">{title}</div>
      {isEditing ? (
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white p-2 rounded-lg text-2xl font-black outline-none border border-gray-200 focus:border-blue-400"
        />
      ) : (
        <div className="text-3xl font-black">{value}</div>
      )}
    </div>
  );
}

// --- המשך קומפוננטות קיימות ---

function ProjectTab({ project, onUpdate }) {
  const [isCreating, setIsCreating] = useState(false);
  const [newProjName, setNewProjName] = useState("");
  const [newProjStages, setNewProjStages] = useState([...DEFAULT_STAGES_TEMPLATE]);

  // State for Reminder UI
  const [reminderOpen, setReminderOpen] = useState(false);
  const [reminderContact, setReminderContact] = useState("");
  const [reminderMsg, setReminderMsg] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");

  const handleStartProject = () => {
    if (!newProjName) return alert("חובה לתת שם לפרויקט");
    const projectStructure = {
      isActive: true,
      name: newProjName,
      currentStageIndex: 0,
      stages: newProjStages.map(stageName => ({ name: stageName, assignee: "", note: "", isApproved: false, stickyNotes: [], dueDate: "", dueTime: "" })),
      reminders: []
    };
    onUpdate(projectStructure);
    setIsCreating(false);
  };

  const handleRemoveStage = (index) => setNewProjStages(prev => prev.filter((_, i) => i !== index));
  const handleAddStage = () => {
    const name = prompt("שם השלב החדש:");
    if (name) setNewProjStages([...newProjStages, name]);
  };

  // שליחת וואטסאפ
  const sendWhatsAppReminder = () => {
    if (!reminderContact || !reminderMsg) return alert("יש לבחור איש קשר ולהזין תוכן להודעה");

    const fullMsg = `*תזכורת ממערכת ADV*\n\nעבור: ${reminderContact}\nפרויקט: ${project.name}\n\n${reminderMsg}`;
    const encodedMsg = encodeURIComponent(fullMsg);
    const newReminder = {
      id: Date.now(),
      contact: reminderContact,
      msg: reminderMsg,
      date: new Date().toISOString()
    };
    onUpdate({
      ...project,
      reminders: [...(project.reminders || []), newReminder]
    });
    // שליחה למספר שלך (050-8504833)
    window.open(`https://wa.me/${MY_PHONE_NUMBER}?text=${encodedMsg}`, '_blank');
    setReminderMsg("");
    setReminderContact("");
    setReminderDate("");
    setReminderTime("");
    setReminderOpen(false);
  };

  if (!project) {
    if (!isCreating) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-10 space-y-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Layout size={40} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700">אין פרויקט פעיל ללקוח זה</h3>
          <button onClick={() => setIsCreating(true)} className="bg-blue-600 text-white text-lg px-8 py-4 rounded-2xl hover:bg-blue-700 font-bold flex items-center gap-3 shadow-lg">
            <Plus size={24} /> התחל פרויקט חדש
          </button>
        </div>
      );
    } else {
      return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-black text-gray-800 mb-6">הגדרת פרויקט חדש</h3>
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-500 mb-2">שם הפרויקט</label>
            <input type="text" className="w-full p-4 border border-gray-200 rounded-xl text-lg font-bold focus:ring-2 focus:ring-blue-500 outline-none" placeholder='למשל: קמפיין קיץ 2025' value={newProjName} onChange={e => setNewProjName(e.target.value)} />
          </div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-bold text-gray-500">שלבי הפרויקט</label>
              <button onClick={handleAddStage} className="text-blue-600 text-sm font-bold hover:underline">+ הוסף שלב</button>
            </div>
            <div className="space-y-2">
              {newProjStages.map((stage, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">{i+1}</span>
                  <input value={stage} onChange={(e) => { const copy = [...newProjStages]; copy[i] = e.target.value; setNewProjStages(copy); }} className="flex-1 bg-transparent outline-none font-medium" />
                  <button onClick={() => handleRemoveStage(i)} className="text-gray-400 hover:text-red-500"><X size={18}/></button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setIsCreating(false)} className="flex-1 py-3 text-gray-500 hover:bg-gray-50 rounded-xl font-bold">ביטול</button>
            <button onClick={handleStartProject} className="flex-2 w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold shadow-md">צור פרויקט והתחל לעבוד</button>
          </div>
        </div>
      );
    }
  }

  const currentStage = project.stages[project.currentStageIndex];
  const currentStageDue = currentStage.dueDate ? new Date(`${currentStage.dueDate}T${currentStage.dueTime || '09:00'}`) : null;
  const progress = Math.round(((project.currentStageIndex + 1) / project.stages.length) * 100);
  const recentReminders = (project.reminders || []).slice(-3).reverse();
  const currentStickyNotes = currentStage.stickyNotes || [];
  const timeToDeadline = currentStageDue
    ? (() => {
        const diff = currentStageDue.getTime() - Date.now();
        if (diff <= 0) return "עבר הזמן";
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        return `${days} ימים ${hours} שעות`;
      })()
    : null;

  const stickyInputRef = React.useRef(null);
  const addStickyNote = () => {
    const val = stickyInputRef.current?.value.trim();
    if (!val) return;
    const updatedStages = [...project.stages];
    const list = updatedStages[project.currentStageIndex].stickyNotes || [];
    list.push({ id: Date.now(), text: val });
    updatedStages[project.currentStageIndex].stickyNotes = list;
    onUpdate({ ...project, stages: updatedStages });
    stickyInputRef.current.value = '';
  };

  const markStageDone = () => {
    const updatedStages = [...project.stages];
    updatedStages[project.currentStageIndex].isApproved = true;
    const nextIndex = Math.min(project.stages.length - 1, project.currentStageIndex + 1);
    onUpdate({ ...project, stages: updatedStages, currentStageIndex: nextIndex });
  };

  return (
    <div className="space-y-8">
      {/* סרגל התקדמות */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 overflow-x-auto">
        <div className="flex items-center min-w-max">
          {project.stages.map((stage, idx) => {
            const isCompleted = idx < project.currentStageIndex;
            const isCurrent = idx === project.currentStageIndex;
            return (
              <div key={idx} className="flex items-center">
                <div className={`flex flex-col items-center gap-2 cursor-pointer group w-32`} onClick={() => onUpdate({...project, currentStageIndex: idx})}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${isCompleted ? 'bg-green-500 text-white shadow-green-200' : isCurrent ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110' : 'bg-gray-100 text-gray-400'}`}>
                    {isCompleted ? <Check /> : idx + 1}
                  </div>
                  <span className={`text-sm font-medium text-center ${isCurrent ? 'text-blue-700 font-bold' : 'text-gray-500'}`}>{stage.name}</span>
                </div>
                {idx < project.stages.length - 1 && <div className={`h-1 w-16 mx-2 rounded-full ${idx < project.currentStageIndex ? 'bg-green-500' : 'bg-gray-200'}`}></div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* אזור עריכת שלב נוכחי + סיכום סטטוס */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* כרטיס ראשי */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
           <div className="flex justify-between items-start mb-6">
             <div>
               <span className="text-blue-600 font-bold text-sm tracking-wider uppercase mb-1 block">עריכת שלב נוכחי</span>
               <h3 className="text-2xl font-black text-gray-800">{currentStage.name}</h3>
             </div>
             <div className="flex items-center gap-2">
               {currentStage.isApproved && (
                 <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2"><Check size={16} /> שלב זה אושר</span>
               )}
               {!currentStage.isApproved && (
                 <button
                   onClick={markStageDone}
                   className="px-3 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700"
                 >
                   סמן כבוצע
                 </button>
               )}
             </div>
           </div>

           <label className="block text-sm font-bold text-gray-500 mb-2">פתק / הנחיות לשלב זה</label>
          <textarea 
            className="w-full p-4 bg-yellow-50 border-2 border-yellow-100 rounded-xl h-40 resize-none focus:border-yellow-300 outline-none text-gray-700 text-lg leading-relaxed"
            placeholder={`רשום כאן הערות עבור שלב ה${currentStage.name}...`}
            value={currentStage.note}
            onChange={(e) => {
               const newStages = [...project.stages];
               newStages[project.currentStageIndex].note = e.target.value;
               onUpdate({...project, stages: newStages});
            }}
          ></textarea>

           <div className="mt-4">
             <div className="flex items-center justify-between mb-2">
               <h4 className="text-sm font-bold text-gray-700">פתקים נדבקים</h4>
             </div>
             <div className="flex gap-2 mb-3">
               <input
                 ref={stickyInputRef}
                 type="text"
                 placeholder="כתוב פתק קצר..."
                 className="flex-1 p-3 rounded-xl border border-amber-200 bg-amber-50 outline-none focus:border-amber-300 text-sm"
                 onKeyDown={(e) => {
                   if (e.key === 'Enter') {
                     addStickyNote();
                   }
                 }}
               />
               <button
                 className="px-3 py-2 rounded-xl bg-amber-500 text-white text-sm font-bold hover:bg-amber-600"
                 onClick={addStickyNote}
               >
                 הוסף פתק
               </button>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
               {currentStickyNotes.map(note => (
                 <div key={note.id} className="bg-amber-100 border border-amber-200 rounded-xl p-3 shadow-sm relative">
                   <p className="text-sm text-amber-900 whitespace-pre-wrap">{note.text}</p>
                   <button
                     className="absolute top-2 left-2 text-amber-700 hover:text-red-600"
                     onClick={() => {
                       const updatedStages = [...project.stages];
                       updatedStages[project.currentStageIndex].stickyNotes = currentStickyNotes.filter(n => n.id !== note.id);
                       onUpdate({ ...project, stages: updatedStages });
                     }}
                   >
                     <X size={14} />
                   </button>
                 </div>
               ))}
               {currentStickyNotes.length === 0 && (
                 <div className="text-xs text-gray-400">אין פתקים עדיין.</div>
               )}
             </div>
           </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-bold text-gray-500 mb-2">אחראי ביצוע</label>
                <select 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium outline-none"
                 value={currentStage.assignee}
                 onChange={(e) => {
                   const newStages = [...project.stages];
                   newStages[project.currentStageIndex].assignee = e.target.value;
                   onUpdate({...project, stages: newStages});
                 }}
                >
                  <option value="">בחר איש צוות...</option>
                  {TEAM_MEMBERS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
             <button onClick={() => { if(confirm("למחוק את הפרויקט הזה?")) onUpdate(null); }} className="mt-7 p-3 text-red-500 hover:bg-red-50 rounded-xl" title="מחק פרויקט"><Trash2 size={20} /></button>
           </div>
        </div>

        {/* כרטיס סטטוס */}
        <div className="bg-white border border-gray-100 p-6 rounded-3xl flex flex-col gap-6 shadow-sm">
          <div>
            <div className="text-sm text-gray-500 font-bold">סטטוס פרויקט</div>
            <div className="flex items-end gap-2">
              <div className="text-5xl font-black text-gray-800">{progress}%</div>
              <span className="text-gray-500">הושלם</span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 mb-1">תאריך יעד</label>
                  <input
                    type="date"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium outline-none"
                    value={currentStage.dueDate || ''}
                    onChange={(e) => {
                      const updatedStages = [...project.stages];
                      updatedStages[project.currentStageIndex].dueDate = e.target.value;
                      onUpdate({ ...project, stages: updatedStages });
                    }}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 mb-1">שעת יעד</label>
                  <input
                    type="time"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium outline-none"
                    value={currentStage.dueTime || ''}
                    onChange={(e) => {
                      const updatedStages = [...project.stages];
                      updatedStages[project.currentStageIndex].dueTime = e.target.value;
                      onUpdate({ ...project, stages: updatedStages });
                    }}
                  />
                </div>
              </div>
              {currentStage.dueDate && (
                <div className="text-xs text-blue-700 bg-blue-50 px-3 py-2 rounded-xl font-bold">
                  דד-ליין: {currentStage.dueDate} {currentStage.dueTime} {timeToDeadline && `· נותרו ${timeToDeadline}`}
                </div>
              )}
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
               <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{width: `${progress}%`}}></div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="text-xs text-slate-400 mb-1 font-bold">אחראי שלב נוכחי</div>
            <div className="font-bold flex items-center gap-2 text-slate-800">
              <User size={16} className="text-blue-500" />
              {currentStage.assignee || "טרם שובץ"}
            </div>
          </div>

          {recentReminders.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border border-slate-100">
              <div className="text-xs text-slate-400 mb-2 font-bold">תזכורות אחרונות</div>
              <div className="space-y-2">
                {recentReminders.map(reminder => (
                  <div key={reminder.id} className="text-xs text-slate-600 border-b border-slate-100 pb-2 last:border-none last:pb-0">
                    <div className="flex justify-between gap-2 items-center">
                      <span className="font-semibold">{reminder.contact}</span>
                      <span className="text-slate-400">{new Date(reminder.date).toLocaleDateString()} · {new Date(reminder.date).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-slate-500">{reminder.msg}</p>
                    <button
                      className="text-red-500 hover:text-red-600 mt-1"
                      onClick={() => {
                        const remaining = (project.reminders || []).filter(r => r.id !== reminder.id);
                        onUpdate({ ...project, reminders: remaining });
                      }}
                    >
                      מחק מהלוג
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!reminderOpen ? (
            <button 
              onClick={() => setReminderOpen(true)}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-blue-200 shadow-lg flex justify-center items-center gap-2"
            >
              <MessageCircle size={18} />
              שלח תזכורת
            </button>
          ) : (
            <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-md relative flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-blue-600">שליחת תזכורת</span>
                <button onClick={() => setReminderOpen(false)}><X size={16} className="text-gray-400"/></button>
              </div>

              <select 
                className="w-full p-2 bg-slate-50 border rounded-lg text-sm mb-2"
                value={reminderContact}
                onChange={e => setReminderContact(e.target.value)}
              >
                <option value="">בחר למי לשלוח...</option>
                {TEAM_MEMBERS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>

              <div className="flex gap-2 mb-2">
                <input
                  type="date"
                  className="flex-1 p-2 bg-slate-50 border rounded-lg text-sm"
                  value={reminderDate}
                  onChange={e => setReminderDate(e.target.value)}
                />
                <input
                  type="time"
                  className="flex-1 p-2 bg-slate-50 border rounded-lg text-sm"
                  value={reminderTime}
                  onChange={e => setReminderTime(e.target.value)}
                />
              </div>

              <textarea 
                className="w-full p-2 bg-slate-50 border rounded-lg text-sm mb-2 resize-none h-20"
                placeholder="תוכן ההודעה..."
                value={reminderMsg}
                onChange={e => setReminderMsg(e.target.value)}
              ></textarea>

              <button 
                onClick={sendWhatsAppReminder}
                className="mt-auto w-full py-2 bg-green-500 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-600"
              >
                <Send size={14} /> שלח לוואטסאפ
              </button>
              {reminderDate && (
                <a
                  className="mt-2 text-xs text-blue-600 hover:underline text-center"
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('תזכורת פרויקט: ' + project.name)}&details=${encodeURIComponent(reminderMsg || '')}&dates=${(() => {
                    const dateStr = reminderDate.replace(/-/g,'');
                    const timeStr = reminderTime ? reminderTime.replace(':','') : '0900';
                    return `${dateStr}T${timeStr}00/${dateStr}T${timeStr}00`;
                  })()}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  הוסף ליומן גוגל
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- קומפוננטות עזר ---

function LinksTab({ links, onUpdate, openConfirm }) {
  const defaultTags = ['מסמכים', 'לוגו וקו עסק', 'יום צילום', 'כללי'];
  const [tags, setTags] = useState(defaultTags);
  const [newTag, setNewTag] = useState('');
  const [newLink, setNewLink] = useState({ name: '', url: '', tag: 'כללי' });
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setNewLink({
      name: file.name,
      url: objectUrl,
      tag: newLink.tag || 'כללי',
      type: 'file',
      fileName: file.name,
      fileType: file.type
    });
  };

  const addLink = () => {
    if (!newLink.name) return;
    const type = newLink.type || 'link';
    onUpdate([...links, { ...newLink, id: Date.now(), type }]);
    setNewLink({ name: '', url: '', tag: 'כללי' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const addTag = () => {
    const tag = newTag.trim();
    if (!tag) return;
    if (!tags.includes(tag)) setTags([...tags, tag]);
    setNewTag('');
    setNewLink(prev => ({ ...prev, tag }));
  };

  const removeTag = (tag) => {
    const doRemove = () => {
      const updated = tags.filter(t => t !== tag);
      setTags(updated);
      if (newLink.tag === tag) setNewLink(prev => ({ ...prev, tag: updated[0] || '' }));
    };
    if (openConfirm) {
      openConfirm({ message: `למחוק את התגית "${tag}"?`, onConfirm: doRemove });
    } else if (window.confirm(`למחוק את התגית "${tag}"?`)) {
      doRemove();
    }
  };

  const updateExistingTag = (id, tag) => {
    onUpdate(links.map(l => l.id === id ? { ...l, tag } : l));
  };
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
        <div>
          <label className="text-xs font-bold text-gray-400 mb-2 block uppercase">תגיות</label>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                type="button"
                className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm transition-all ${newLink.tag === tag ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setNewLink(prev => ({ ...prev, tag }))}
              >
                <span>{tag}</span>
                <X
                  size={14}
                  className="text-gray-400 hover:text-red-500"
                  onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
                  title="מחק תגית"
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="תגית חדשה..."
              className="flex-1 min-w-[180px] p-2 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-blue-400"
            />
            <button onClick={addTag} className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800">הוסף תגית</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-dashed border-gray-200">
          <div className="flex-1 w-full">
            <label className="text-xs font-bold text-gray-400 mb-1 block uppercase">שם המסמך</label>
            <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="למשל: לוגו וקטורי" value={newLink.name} onChange={e => setNewLink({...newLink, name: e.target.value})}/>
          </div>
          <div className="flex-1 w-full">
            <label className="text-xs font-bold text-gray-400 mb-1 block uppercase">קישור</label>
            <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-left" placeholder="https://..." dir="ltr" value={newLink.url} onChange={e => setNewLink({...newLink, url: e.target.value, type: 'link'})}/>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-start">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm font-bold text-slate-700 flex items-center gap-2"
          >
            <ImageIcon size={16} />
            העלה קובץ
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
          />
          <button onClick={addLink} className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700">שמור קישור</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map(link => (
          <div key={link.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-blue-300 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 overflow-hidden border border-blue-100">
                {link.type === 'file' || /\.(png|jpe?g|gif|webp|svg)$/i.test(link.url || '') ? (
                  <img src={link.url} alt={link.name} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon />
                )}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-gray-800 text-lg truncate">{link.name}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <select
                    value={link.tag || ''}
                    onChange={(e) => updateExistingTag(link.id, e.target.value)}
                    className="px-2 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-700 text-xs outline-none focus:border-blue-400"
                  >
                    {[...tags, link.tag].filter(Boolean).filter((v,i,a)=>a.indexOf(v)===i).map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                  {link.type === 'file' && <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">קובץ</span>}
                </div>
                <a href={link.url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline truncate max-w-[220px] block" dir="ltr">
                  {link.url}
                </a>
              </div>
            </div>
            <button
              onClick={() => {
                const doDelete = () => onUpdate(links.filter(l => l.id !== link.id));
                if (openConfirm) {
                  openConfirm({ message: `למחוק את "${link.name}"?`, onConfirm: doDelete });
                } else if (window.confirm(`למחוק את "${link.name}"?`)) {
                  doDelete();
                }
              }}
              className="text-gray-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoTab({ contact, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempContact, setTempContact] = useState(contact);
  const handleSave = () => { onUpdate(tempContact); setIsEditing(false); };
  const handleCancel = () => { setTempContact(contact); setIsEditing(false); };

  const phoneDigits = tempContact.phone ? tempContact.phone.replace(/\D/g, '') : '';
  const waPhone = phoneDigits
    ? (phoneDigits.startsWith('972') ? phoneDigits : `972${phoneDigits.replace(/^0/, '')}`)
    : '';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-black text-gray-800">כרטיס ביקור דיגיטלי</h3>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-full font-bold hover:bg-slate-800 transition-all shadow-sm">
            <Edit2 size={16} /> ערוך פרטים
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleCancel} className="px-5 py-2 rounded-full font-bold text-gray-600 hover:bg-gray-100 border border-gray-200">ביטול</button>
            <button onClick={handleSave} className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full font-bold hover:bg-green-700 shadow-lg">
              <Save size={16} /> שמור
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3 text-gray-500 font-bold text-sm uppercase border-b pb-4">
            <Smartphone size={18} /> ערוצי תקשורת
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 font-bold uppercase">טלפון</span>
                {!isEditing && waPhone && (
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">חיוג</span>
                )}
              </div>
              {isEditing ? (
                <input
                  value={tempContact.phone}
                  onChange={e => setTempContact({...tempContact, phone: e.target.value})}
                  className="w-full p-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-blue-400"
                  placeholder="050-0000000"
                />
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-black text-slate-800">{tempContact.phone || '---'}</span>
                  <div className="flex gap-2">
                    {tempContact.phone && (
                      <>
                        <button onClick={() => window.open(`tel:${tempContact.phone}`)} className="px-3 py-2 rounded-xl bg-green-500 text-white text-sm font-bold hover:bg-green-600">חייג</button>
                        <button onClick={() => waPhone && window.open(`https://wa.me/${waPhone}`)} className="px-3 py-2 rounded-xl bg-green-50 text-green-700 text-sm font-bold hover:bg-green-100 flex items-center gap-1">
                          <MessageCircle size={14} /> וואטסאפ
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 font-bold uppercase">אימייל</span>
                {!isEditing && tempContact.email && <span className="text-gray-400 text-xs">שלח מייל</span>}
              </div>
              {isEditing ? (
                <input
                  value={tempContact.email}
                  onChange={e => setTempContact({...tempContact, email: e.target.value})}
                  className="w-full p-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-blue-400"
                  placeholder="email@example.com"
                />
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-bold text-slate-800">{tempContact.email || '---'}</span>
                  {tempContact.email && (
                    <button onClick={() => window.open(`mailto:${tempContact.email}`)} className="px-3 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 w-fit">שלח מייל</button>
                  )}
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 font-bold uppercase">אתר אינטרנט</span>
                {!isEditing && tempContact.website && <span className="text-gray-400 text-xs">בקר באתר</span>}
              </div>
              {isEditing ? (
                <input
                  value={tempContact.website}
                  onChange={e => setTempContact({...tempContact, website: e.target.value})}
                  className="w-full p-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-blue-400 text-left"
                  placeholder="https://..."
                  dir="ltr"
                />
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-bold text-slate-800 break-all" dir="ltr">{tempContact.website || '---'}</span>
                  {tempContact.website && (
                    <button onClick={() => window.open(tempContact.website, '_blank')} className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 w-fit">בקר באתר</button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-3">
            <div className="flex items-center gap-3 text-gray-500 font-bold text-sm uppercase border-b pb-3">
              <Instagram size={18} /> סושיאל
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-gray-500 font-bold uppercase mb-1">אינסטגרם</div>
                {isEditing ? (
                  <input value={tempContact.instagram} onChange={e => setTempContact({...tempContact, instagram: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-blue-400" placeholder="instagram_handle"/>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-800">{tempContact.instagram || '---'}</span>
                    {tempContact.instagram && <button onClick={() => window.open(`https://instagram.com/${tempContact.instagram}`, '_blank')} className="px-3 py-1.5 rounded-xl bg-pink-600 text-white text-sm font-bold hover:bg-pink-700">פתח</button>}
                  </div>
                )}
              </div>
              <div>
                <div className="text-xs text-gray-500 font-bold uppercase mb-1">פייסבוק</div>
                {isEditing ? (
                  <input value={tempContact.facebook} onChange={e => setTempContact({...tempContact, facebook: e.target.value})} className="w-full p-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-blue-400" placeholder="שם דף/חיפוש"/>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-800">{tempContact.facebook || '---'}</span>
                    {tempContact.facebook && <button onClick={() => window.open(`https://www.facebook.com/search/top?q=${encodeURIComponent(tempContact.facebook)}`, '_blank')} className="px-3 py-1.5 rounded-xl bg-blue-700 text-white text-sm font-bold hover:bg-blue-800">פתח</button>}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-3xl border border-yellow-100">
            <label className="flex items-center gap-2 font-bold text-yellow-800 mb-2">
              <FileText size={18}/> הערות חשובות
            </label>
            {isEditing ? (
              <textarea className="w-full bg-white p-3 rounded-xl border border-yellow-200 h-32 focus:ring-2 focus:ring-yellow-400 outline-none" value={tempContact.notes} onChange={e => setTempContact({...tempContact, notes: e.target.value})}></textarea>
            ) : (
              <p className="text-yellow-900 leading-relaxed whitespace-pre-line">{contact.notes || "אין הערות מיוחדות."}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactDialog({ open, contact, onChange, onClose, onSave }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 border border-gray-100 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-lg font-black text-gray-800">עריכת פרטי קשר</h4>
            <p className="text-xs text-gray-500">עדכן טלפון, מייל וקישורים מרכזיים.</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="space-y-3">
          <input value={contact.phone} onChange={e => onChange({...contact, phone: e.target.value})} placeholder="טלפון" className="w-full p-3 bg-gray-50 border rounded-xl outline-none"/>
          <input value={contact.email} onChange={e => onChange({...contact, email: e.target.value})} placeholder="אימייל" className="w-full p-3 bg-gray-50 border rounded-xl outline-none"/>
          <input value={contact.website} onChange={e => onChange({...contact, website: e.target.value})} placeholder="אתר" className="w-full p-3 bg-gray-50 border rounded-xl outline-none" dir="ltr"/>
          <input value={contact.instagram} onChange={e => onChange({...contact, instagram: e.target.value})} placeholder="אינסטגרם" className="w-full p-3 bg-gray-50 border rounded-xl outline-none"/>
          <input value={contact.facebook} onChange={e => onChange({...contact, facebook: e.target.value})} placeholder="פייסבוק" className="w-full p-3 bg-gray-50 border rounded-xl outline-none"/>
          <textarea value={contact.notes} onChange={e => onChange({...contact, notes: e.target.value})} placeholder="הערות" className="w-full p-3 bg-gray-50 border rounded-xl outline-none h-24"/>
        </div>
        <div className="flex gap-2">
          <button onClick={onSave} className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800">שמור</button>
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50">ביטול</button>
        </div>
      </div>
    </div>
  );
}

function ContactField({ icon: Icon, label, value, isEditing, onChange, action, actionLabel, actionColor, customView }) {
  if (customView) return customView;
  return (
    <div className="flex items-end gap-3">
      <div className="flex-1">
        <label className="text-xs font-bold text-gray-400 mb-1 flex items-center gap-1">
          <Icon size={12} /> {label}
        </label>
        {isEditing ? (
          <input type="text" className="w-full p-2 border-b-2 border-gray-200 focus:border-blue-500 outline-none bg-transparent font-medium" value={value} onChange={e => onChange(e.target.value)}/>
        ) : (
          <div className="font-bold text-gray-800 text-lg truncate h-8 flex items-center">
            {value || "---"}
          </div>
        )}
      </div>
      {!isEditing && value && action && (
        <button onClick={action} className={`${actionColor} text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-md hover:opacity-90 transition-opacity`}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function VerificationTab({ tasks, onUpdateTasks }) {
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    const text = newTask.trim();
    if (!text) return;
    const updated = [...tasks, { id: Date.now(), text, done: false }];
    onUpdateTasks(updated);
    setNewTask("");
  };

  const toggleTask = (id) => {
    onUpdateTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    onUpdateTasks(tasks.filter(t => t.id !== id));
  };

  const visible = tasks.filter(t => {
    if (filter === "done") return t.done;
    if (filter === "open") return !t.done;
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
        <h3 className="text-2xl font-black text-gray-800 mb-2">לוח משימות</h3>
        <p className="text-gray-500 text-sm mb-4">נהל משימות בוצע/לא בוצע ללא קשר לשלבי הפרויקט.</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="הוסף משימה חדשה..."
            className="flex-1 p-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-blue-400"
            onKeyDown={(e) => { if (e.key === 'Enter') addTask(); }}
          />
          <button
            onClick={addTask}
            className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
          >
            הוסף משימה
          </button>
        </div>
        <div className="mt-4 flex gap-2">
          {['all','open','done'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-sm border ${filter === f ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}
            >
              {f === 'all' ? 'הכול' : f === 'open' ? 'פתוחות' : 'בוצעו'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {visible.map(task => (
          <div key={task.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5 accent-blue-600"
              />
              <span className={`font-medium ${task.done ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{task.text}</span>
            </div>
            <button onClick={() => deleteTask(task.id)} className="text-gray-400 hover:text-red-500">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="text-center text-gray-400 py-8 border border-dashed border-gray-200 rounded-2xl">
            אין משימות להצגה.
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ id, icon: Icon, label, active, onClick }) {
  const isActive = active === id;
  return (
    <button onClick={() => onClick(id)} className={`flex items-center gap-2 px-6 py-5 border-b-4 transition-all whitespace-nowrap outline-none ${isActive ? 'border-blue-600 text-blue-800 font-bold' : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
      <Icon size={isActive ? 20 : 18} className={isActive ? "text-blue-600" : ""} />
      {label}
    </button>
  );
}

function Sidebar() {
  const mainButtonClasses =
    "w-10 h-10 rounded-2xl flex items-center justify-center hover:bg-slate-800 transition-colors cursor-pointer";
  const iconClasses = "w-5 h-5";

  return (
    <aside className="hidden md:flex flex-col items-center gap-4 w-20 bg-slate-900 text-slate-100 py-6 border-l border-slate-800">
      {/* לוגו קטן בצד */}
      <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center mb-4">
        <Folder className="w-5 h-5 text-slate-200" />
      </div>

      {/* כפתורי ניווט עיקריים */}
      <button className={mainButtonClasses} title="לקוחות">
        <Users className={iconClasses} />
      </button>
      <button className={mainButtonClasses} title="פרויקטים">
        <Layout className={iconClasses} />
      </button>
      <button className={mainButtonClasses} title="תוצאות ודוחות">
        <BarChart2 className={iconClasses} />
      </button>
      <button className={mainButtonClasses} title="תזכורות ווואטסאפ">
        <MessageCircle className={iconClasses} />
      </button>

      {/* מפריד קטן */}
      <div className="w-8 h-px bg-slate-700 my-2" />

      {/* כפתור הגדרות / פרופיל */}
      <button className={mainButtonClasses} title="הגדרות">
        <User className={iconClasses} />
      </button>
    </aside>
  );
}
