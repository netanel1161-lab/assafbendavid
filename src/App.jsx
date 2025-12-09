import React, { useState, useEffect } from 'react';
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
const BRAND_LOGO = "https://i.ibb.co/Xx8XpBQ/logo.png"; // השתמשתי בקישור הדמיה, יש להחליף ללינק הישיר אם לא עובד
const BRAND_NAME = "ASSAF BEN DAVID - ADV";
const MY_PHONE_NUMBER = "972508504833"; // המספר שלך לשליחת התזכורות

const DEFAULT_STAGES_TEMPLATE = [
  "תכנון אסטרטגי",
  "קופירייטינג",
  "אישור ויזואלי",
  "יום צילום",
  "עריכה ופוסט"
];

const INITIAL_CLIENTS = [
  {
    id: 1,
    name: "מסעדת נוקה",
    logo: "https://scontent.cdninstagram.com/v/t51.82787-15/520077361_18012368498774055_7485616743030910864_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzY3ODE3NzAyNzI2MzQ5MTc2Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=wZ5TMMzCp_kQ7kNvwG5-tqc&_nc_oc=AdkDUtdM-MWLpDUbK-vRYMAj7_Tb5_O8wPjt1QgVbQ8GzlFq-Xxod9ohFH5c7LCnLms&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=yoLCRnYSXPIamebveqkIIQ&oh=00_Afkp0TwqzPbhAZk6npuMSAqkP6_La4Xg0kTLIjhZ9tG5Ug&oe=693E0265",
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
        { name: "בניית קונספט", assignee: "רון קריאייטיב", note: "אושר הקונספט הכהה", isApproved: true },
        { name: "צילום מנות", assignee: "דנה הפקות", note: "תיאום צלם לשבוע הבא", isApproved: false },
        { name: "עיצוב תפריט", assignee: "עידן עיצוב", note: "", isApproved: false },
        { name: "הדפסה והפצה", assignee: "", note: "", isApproved: false }
      ]
    },
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

export default function App() {
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('agencyClientsV3');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });

  const [selectedClientId, setSelectedClientId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('agencyClientsV3', JSON.stringify(clients));
  }, [clients]);

  const handleClientClick = (id) => {
    setSelectedClientId(id);
    setIsModalOpen(true);
  };

  const deleteClient = (clientId, clientName) => {
    if (window.confirm(`האם אתה בטוח שברצונך למחוק את הלקוח "${clientName}"?`)) {
      setClients(prev => prev.filter(client => client.id !== clientId));
    }
  };

  const updateClientData = (clientId, newData) => {
    setClients(prev => prev.map(client => 
      client.id === clientId ? { ...client, ...newData } : client
    ));
  };

  const createNewClient = () => {
    const name = prompt("שם הלקוח החדש:");
    if (!name) return;
    const newClient = {
      id: Date.now(),
      name: name,
      logo: "https://via.placeholder.com/200?text=" + name.charAt(0),
      contact: { phone: "", email: "", website: "", instagram: "", facebook: "", notes: "" },
      links: [],
      project: null,
      results: { followers: 0, leads: 0, reach: 0, engagement: "0%" }
    };
    setClients([...clients, newClient]);
  };

  const selectedClient = clients.find(c => c.id === selectedClientId);

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* לוגו בעיגול ליד השם */}
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-100 shadow-sm">
                <img src="/media/images/logo.svg" alt="Logo" className="w-10 h-10 object-contain" />
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
      <main className="max-w-7xl mx-auto p-6">
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
          onClose={() => setIsModalOpen(false)} 
          onUpdate={(data) => updateClientData(selectedClient.id, data)}
        />
      )}
    </div>
  );
}

// --- המודל הראשי ---

function ClientModal({ client, onClose, onUpdate }) {
  const [activeTab, setActiveTab] = useState('project');

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
            <LinksTab links={client.links} onUpdate={(links) => onUpdate({ ...client, links })} />
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
              project={client.project} 
              onUpdate={(project) => onUpdate({ ...client, project })} 
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

  const handleStartProject = () => {
    if (!newProjName) return alert("חובה לתת שם לפרויקט");
    const projectStructure = {
      isActive: true,
      name: newProjName,
      currentStageIndex: 0,
      stages: newProjStages.map(stageName => ({ name: stageName, assignee: "", note: "", isApproved: false }))
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

    const fullMsg = `*תזכורת ממערכת ADV*\\n\\nעבור: ${reminderContact}\\nפרויקט: ${project.name}\\n\\n${reminderMsg}`;
    const encodedMsg = encodeURIComponent(fullMsg);
    // שליחה למספר שלך (050-8504833)
    window.open(`https://wa.me/${MY_PHONE_NUMBER}?text=${encodedMsg}`, '_blank');
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
             {currentStage.isApproved && (
               <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2"><Check size={16} /> שלב זה אושר</span>
             )}
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
        <div className="bg-white border-2 border-slate-100 p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-lg shadow-slate-200/50">
          <div>
            <h4 className="text-slate-400 font-bold text-sm uppercase mb-4 tracking-widest">סטטוס פרויקט</h4>
            <div className="flex items-baseline gap-2">
              <div className="text-5xl font-black text-slate-800">{Math.round(((project.currentStageIndex) / project.stages.length) * 100)}%</div>
              <span className="text-slate-400 font-medium">הושלם</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
               <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{width: `${Math.round(((project.currentStageIndex) / project.stages.length) * 100)}%`}}></div>
            </div>
          </div>

          <div className="mt-8 space-y-4 relative z-10">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="text-xs text-slate-400 mb-1 font-bold">אחראי שלב נוכחי</div>
              <div className="font-bold flex items-center gap-2 text-slate-800">
                <User size={16} className="text-blue-500" />
                {currentStage.assignee || "טרם שובץ"}
              </div>
            </div>

            {/* אזור תזכורת משופר */}
            {!reminderOpen ? (
              <button 
                onClick={() => setReminderOpen(true)}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-blue-200 shadow-lg flex justify-center items-center gap-2"
              >
                <MessageCircle size={18} />
                שלח תזכורת
              </button>
            ) : (
              <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-md absolute inset-0 z-20 flex flex-col">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- קומפוננטות עזר ---

function LinksTab({ links, onUpdate }) {
  const [newLink, setNewLink] = useState({ name: '', url: '', tag: 'כללי' });
  const addLink = () => {
    if (!newLink.name) return;
    onUpdate([...links, { ...newLink, id: Date.now(), type: 'link' }]);
    setNewLink({ name: '', url: '', tag: 'כללי' });
  };
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="text-xs font-bold text-gray-400 mb-1 block uppercase">שם המסמך</label>
          <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="למשל: לוגו וקטורי" value={newLink.name} onChange={e => setNewLink({...newLink, name: e.target.value})}/>
        </div>
        <div className="flex-1 w-full">
          <label className="text-xs font-bold text-gray-400 mb-1 block uppercase">קישור</label>
          <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-left" placeholder="https://..." dir="ltr" value={newLink.url} onChange={e => setNewLink({...newLink, url: e.target.value})}/>
        </div>
        <button onClick={addLink} className="w-full md:w-auto bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 font-bold px-6">שמור קישור</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map(link => (
          <div key={link.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-blue-300 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <ImageIcon />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">{link.name}</h4>
                <a href={link.url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline truncate max-w-[200px] block" dir="ltr">
                  {link.url}
                </a>
              </div>
            </div>
            <button onClick={() => onUpdate(links.filter(l => l.id !== link.id))} className="text-gray-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">כרטיס ביקור דיגיטלי</h3>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-slate-800 text-white px-5 py-2 rounded-full font-bold hover:bg-slate-700 transition-all">
            <Edit2 size={16} /> ערוך פרטים
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleCancel} className="px-5 py-2 rounded-full font-bold text-gray-500 hover:bg-gray-200">ביטול</button>
            <button onClick={handleSave} className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full font-bold hover:bg-green-700 shadow-lg">
              <Save size={16} /> שמור שינויים
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center gap-3 text-gray-400 font-bold text-sm uppercase border-b pb-4 mb-4">
            <Smartphone size={18} /> ערוצי תקשורת
          </div>
          <ContactField icon={Phone} label="טלפון" value={tempContact.phone} isEditing={isEditing} onChange={v => setTempContact({...tempContact, phone: v})} action={() => window.open(`tel:${tempContact.phone}`)} actionLabel="חייג" actionColor="bg-green-500"/>
          <ContactField icon={MessageCircle} label="וואטסאפ (טלפון)" value={tempContact.phone} isEditing={false} customView={!isEditing && (
            <button onClick={() => tempContact.phone && window.open(`https://wa.me/972${tempContact.phone.replace(/-/g, '').substring(1)}`)} className="w-full py-3 bg-green-50 text-green-700 font-bold rounded-xl hover:bg-green-100 flex items-center justify-center gap-2 transition-colors">
              <MessageCircle size={18} /> שלח הודעה בוואטסאפ
            </button>
          )}/>
          <ContactField icon={Mail} label="אימייל" value={tempContact.email} isEditing={isEditing} onChange={v => setTempContact({...tempContact, email: v})} action={() => window.open(`mailto:${tempContact.email}`)} actionLabel="שלח מייל" actionColor="bg-blue-500"/>
          <ContactField icon={Globe} label="אתר אינטרנט" value={tempContact.website} isEditing={isEditing} onChange={v => setTempContact({...tempContact, website: v})} action={() => window.open(tempContact.website, '_blank')} actionLabel="בקר באתר" actionColor="bg-indigo-500"/>
        </div>
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center gap-3 text-gray-400 font-bold text-sm uppercase border-b pb-4 mb-4">
              <Instagram size={18} /> סושיאל
            </div>
            <ContactField icon={Instagram} label="אינסטגרם" value={tempContact.instagram} isEditing={isEditing} onChange={v => setTempContact({...tempContact, instagram: v})} action={() => window.open(`https://instagram.com/${tempContact.instagram}`, '_blank')} actionLabel="פתח" actionColor="bg-pink-600"/>
            <ContactField icon={Facebook} label="פייסבוק" value={tempContact.facebook} isEditing={isEditing} onChange={v => setTempContact({...tempContact, facebook: v})} action={() => tempContact.facebook && window.open(`https://www.facebook.com/search/top?q=${encodeURIComponent(tempContact.facebook)}`, '_blank')} actionLabel="פתח" actionColor="bg-blue-700"/>
          </div>
          <div className="bg-yellow-50 p-6 rounded-3xl border border-yellow-100 h-full">
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

function VerificationTab({ project, onUpdate }) {
  if (!project) return (
    <div className="text-center py-20 text-gray-400">
      <h3 className="text-xl font-bold">אין פרויקט פעיל</h3>
      <p>כדי לאשר משימות, יש ליצור פרויקט בטאב "ניהול פרויקט".</p>
    </div>
  );
  const toggleApprove = (index) => { const newStages = [...project.stages]; newStages[index].isApproved = !newStages[index].isApproved; onUpdate({ ...project, stages: newStages }); };
  const completedCount = project.stages.filter(s => s.isApproved).length;
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-indigo-900 text-white p-8 rounded-3xl mb-8 flex justify-between items-center shadow-xl">
        <div>
          <h3 className="text-2xl font-black">בקרת איכות ואישור משימות</h3>
          <p className="text-indigo-200">סמן כל שלב שהושלם ואושר סופית מול הלקוח</p>
        </div>
        <div className="text-center bg-white/10 p-4 rounded-2xl backdrop-blur-md">
          <span className="block text-3xl font-bold">{completedCount} / {project.stages.length}</span>
          <span className="text-xs uppercase tracking-widest opacity-70">הושלמו</span>
        </div>
      </div>
      <div className="space-y-4">
        {project.stages.map((stage, index) => (
          <div key={index} className={`relative p-6 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group ${stage.isApproved ? 'bg-green-50 border-green-500 shadow-none' : 'bg-white border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-md'}`}>
            <div className="flex items-center gap-6">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${stage.isApproved ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                {stage.isApproved ? <Check size={20} /> : index + 1}
              </div>
              <div>
                <h4 className={`text-xl font-bold ${stage.isApproved ? 'text-green-800 line-through opacity-70' : 'text-gray-800'}`}>
                  {stage.name}
                </h4>
                <div className="text-sm text-gray-500 mt-1 flex gap-4">
                  <span>אחראי: {stage.assignee || 'טרם נקבע'}</span>
                  {stage.note && <span className="text-gray-400 truncate max-w-[200px]">| {stage.note}</span>}
                </div>
              </div>
            </div>
            <button onClick={() => toggleApprove(index)} className={`px-6 py-3 rounded-xl font-bold transition-all transform active:scale-95 ${stage.isApproved ? 'bg-white text-green-600 border border-green-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'}`}>
              {stage.isApproved ? 'בטל אישור' : 'אשר ביצוע'}
            </button>
          </div>
        ))}
      </div>
      {completedCount === project.stages.length && (
        <div className="mt-10 text-center animate-bounce">
          <span className="inline-block bg-yellow-400 text-yellow-900 px-6 py-2 rounded-full font-bold shadow-lg">🎉 כל המשימות הושלמו בהצלחה!</span>
        </div>
      )}
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
