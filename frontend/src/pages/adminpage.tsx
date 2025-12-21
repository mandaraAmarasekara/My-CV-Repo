import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { 
  LogOut, Plus, Trash2, FolderGit2, 
  LayoutDashboard, GraduationCap, Trophy, Zap, 
  Save, X 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPES ---
type Project = { id: string; title: string; description: string; image: string; tech: string; link: string; };
type Skill = { id: string; name: string; level: string; icon: string; }; // Level: Beginner, Intermediate, etc.
type Education = { id: string; degree: string; school: string; year: string; description: string; };
type Achievement = { id: string; title: string; date: string; description: string; };

type Section = 'overview' | 'projects' | 'skills' | 'education' | 'achievements';

const KEYS = {
  PROJECTS: "portfolio_projects",
  SKILLS: "portfolio_skills",
  EDUCATION: "portfolio_education",
  ACHIEVEMENTS: "portfolio_achievements"
};

export default function AdminPage() {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState<Section>('overview');

  // --- GLOBAL STATE ---
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // --- LOAD DATA ---
  useEffect(() => {
    const load = (key: string, setter: Function) => {
      const saved = localStorage.getItem(key);
      if (saved) setter(JSON.parse(saved));
    };
    load(KEYS.PROJECTS, setProjects);
    load(KEYS.SKILLS, setSkills);
    load(KEYS.EDUCATION, setEducation);
    load(KEYS.ACHIEVEMENTS, setAchievements);
  }, []);

  // --- GENERIC SAVE FUNCTION ---
  const saveData = (key: string, data: any[], setter: Function) => {
    setter(data);
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event("storage")); // Notify other components
  };

  // --- RENDER CONTENT ---
  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col p-4 z-20">
        <div className="mb-8 px-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-xs text-slate-500 mt-1 truncate">{user?.email}</p>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem 
            icon={<LayoutDashboard size={18}/>} 
            label="Overview" 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
          />
          <div className="pt-4 pb-2 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Content</div>
          <SidebarItem icon={<FolderGit2 size={18}/>} label="Projects" active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} />
          <SidebarItem icon={<Zap size={18}/>} label="Skills" active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} />
          <SidebarItem icon={<GraduationCap size={18}/>} label="Education" active={activeTab === 'education'} onClick={() => setActiveTab('education')} />
          <SidebarItem icon={<Trophy size={18}/>} label="Achievements" active={activeTab === 'achievements'} onClick={() => setActiveTab('achievements')} />
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto bg-slate-950 p-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            {activeTab === 'overview' && (
              <OverviewView 
                projects={projects} 
                skills={skills} 
                education={education} 
                achievements={achievements} 
              />
            )}
            {activeTab === 'projects' && (
              <GenericManager 
                title="Projects" 
                data={projects} 
                onSave={(d) => saveData(KEYS.PROJECTS, d, setProjects)}
                fields={[
                  { name: 'title', placeholder: 'Project Title' },
                  { name: 'link', placeholder: 'Live Link' },
                  { name: 'tech', placeholder: 'Tech Stack (React, Node...)' },
                  { name: 'image', placeholder: 'Image URL' },
                  { name: 'description', placeholder: 'Description', type: 'textarea' }
                ]}
              />
            )}
            {activeTab === 'skills' && (
              <GenericManager 
                title="Skills" 
                data={skills} 
                onSave={(d) => saveData(KEYS.SKILLS, d, setSkills)}
                fields={[
                  { name: 'name', placeholder: 'Skill Name (e.g. React)' },
                  { name: 'level', placeholder: 'Level (e.g. Advanced, 90%)' },
                ]}
              />
            )}
            {activeTab === 'education' && (
              <GenericManager 
                title="Education" 
                data={education} 
                onSave={(d) => saveData(KEYS.EDUCATION, d, setEducation)}
                fields={[
                  { name: 'degree', placeholder: 'Degree / Certificate' },
                  { name: 'school', placeholder: 'Institution / Platform' },
                  { name: 'year', placeholder: 'Year (e.g. 2020 - 2024)' },
                  { name: 'description', placeholder: 'Details (optional)', type: 'textarea' }
                ]}
              />
            )}
            {activeTab === 'achievements' && (
              <GenericManager 
                title="Achievements" 
                data={achievements} 
                onSave={(d) => saveData(KEYS.ACHIEVEMENTS, d, setAchievements)}
                fields={[
                  { name: 'title', placeholder: 'Achievement Title' },
                  { name: 'date', placeholder: 'Date Received' },
                  { name: 'description', placeholder: 'Description', type: 'textarea' }
                ]}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- SUB COMPONENTS ---

const SidebarItem = ({ icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? "bg-cyan-600/20 text-cyan-400 border border-cyan-500/30" 
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`}
  >
    {icon}
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const OverviewView = ({ projects, skills, education, achievements }: any) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard icon={<FolderGit2 />} label="Projects" count={projects.length} color="bg-blue-500" />
      <StatCard icon={<Zap />} label="Skills" count={skills.length} color="bg-yellow-500" />
      <StatCard icon={<GraduationCap />} label="Education" count={education.length} color="bg-purple-500" />
      <StatCard icon={<Trophy />} label="Achievements" count={achievements.length} color="bg-green-500" />
    </div>
    
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-slate-300">Quick Tips</h3>
      <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm">
        <li>Images should be direct URLs (e.g., from Unsplash or Imgur).</li>
        <li>For Tech Stacks, use comma-separated values for better formatting later.</li>
        <li>Changes are saved to LocalStorage instantly.</li>
      </ul>
    </div>
  </div>
);

const StatCard = ({ icon, label, count, color }: any) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
    <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-white`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold text-white">{count}</p>
    </div>
  </div>
);

// --- GENERIC MANAGER (Handles Forms & Lists for any data type) ---
const GenericManager = ({ title, data, onSave, fields }: { title: string, data: any[], onSave: (d: any[]) => void, fields: any[] }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const handleAdd = () => {
    // Basic validation
    if (!formData[fields[0].name]) return alert("Please fill the first field at least.");
    
    const newItem = {
      id: crypto.randomUUID(),
      ...formData
    };
    onSave([...data, newItem]);
    setFormData({});
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure?")) {
      onSave(data.filter((item: any) => item.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Manage {title}</h2>
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          {isFormOpen ? <X size={18}/> : <Plus size={18}/>}
          {isFormOpen ? "Cancel" : "Add New"}
        </button>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl grid gap-4 md:grid-cols-2">
              {fields.map((field) => (
                field.type === 'textarea' ? (
                  <textarea
                    key={field.name}
                    placeholder={field.placeholder}
                    className="md:col-span-2 bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none resize-none h-24"
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  />
                ) : (
                  <input
                    key={field.name}
                    placeholder={field.placeholder}
                    className={`bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none ${fields.length === 1 ? 'md:col-span-2' : ''}`}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  />
                )
              ))}
              <div className="md:col-span-2 flex justify-end">
                <button 
                  onClick={handleAdd}
                  className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium"
                >
                  <Save size={18} /> Save Item
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 gap-4">
        {data.length === 0 && (
          <div className="md:col-span-2 text-center py-12 text-slate-500 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
            No items found. Click "Add New" to create one.
          </div>
        )}
        {data.map((item: any) => (
          <motion.div 
            key={item.id} 
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-800 p-5 rounded-xl group hover:border-slate-700 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {/* Dynamic rendering based on what fields exist */}
                <h3 className="font-bold text-lg text-slate-100">{item.title || item.name || item.degree}</h3>
                <p className="text-cyan-400 text-sm mb-1">{item.school || item.level || item.date || item.tech}</p>
                {item.description && <p className="text-slate-400 text-sm line-clamp-2">{item.description}</p>}
                {item.link && <a href={item.link} target="_blank" className="text-xs text-blue-400 hover:underline mt-2 block">{item.link}</a>}
              </div>
              <button 
                onClick={() => handleDelete(item.id)}
                className="text-slate-600 hover:text-red-400 transition-colors p-2"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};