import React, { useState } from 'react';
import { Search, MapPin, Phone, Star, ShieldCheck, UserPlus, Briefcase, CheckCircle, DollarSign, Wrench, Zap, Paintbrush, Home, Building2 } from 'lucide-react,';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  // Initial Mock Providers Data for SiraConnect
  const [providers, setProviders] = useState([
    {
      id: 1,
      name: 'አበበ ከበደ',
      category: 'የቧንቧ ስራ (Plumbing)',
      location: 'ቀበሌ 04',
      phone: '+251 91 234 5678',
      rating: 4.8,
      reviewsCount: 24,
      experience: '5 ዓመት',
      verified: true,
      bio: 'የቤት ውስጥ የቧንቧ ዝርጋታ፣ የፍሳሽ ቱቦ ጥገና እና የሳኒታሪ እቃዎች ተከላ በብቃት እንሰራለን።',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'ዮናታን ታደሰ',
      category: 'የመብራት ስራ (Electrical)',
      location: 'ቀበሌ 02',
      phone: '+251 92 345 6789',
      rating: 4.9,
      reviewsCount: 31,
      experience: '7 ዓመት',
      verified: true,
      bio: 'የቤት እና የቢሮ የኤሌክትሪክ ዝርጋታ፣ የላይት ተከላ እና የCurrent ጥገና ባለሙያ።',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      name: 'ሳሙኤል መኮንን',
      category: 'የቀለም ቅብ (Painting)',
      location: 'ቀበሌ 01',
      phone: '+251 93 456 7890',
      rating: 4.7,
      reviewsCount: 19,
      experience: '4 ዓመት',
      verified: false,
      bio: 'ዘመናዊ የቤት ውስጥ እና የውጪ ግድግዳ ቀለም ቅብ፣ ዲኮር እና ፕላስተር ስራዎች።',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      name: 'መዓዛ አለሙ',
      category: 'የቤት እጥባ እና ጽዳት (Cleaning)',
      location: 'ቀበሌ 05',
      phone: '+251 94 567 8901',
      rating: 5.0,
      reviewsCount: 42,
      experience: '3 ዓመት',
      verified: true,
      bio: 'አዲስ የተገነቡ ቤቶችን ማጽዳት፣ የጠቅላላ ጽዳት እና የሶፋ እጥበት አገልግሎት።',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    }
  ]);

  // Form State for New Provider Registration
  const [formData, setFormData] = useState({
    name: '',
    category: 'የቧንቧ ስራ (Plumbing)',
    location: 'ቀበሌ 01',
    phone: '',
    experience: '',
    bio: ''
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('እባክዎ ስምዎን እና ስልክ ቁጥርዎን ያስገቡ!');
      return;
    }

    const newProvider = {
      id: providers.length + 1,
      ...formData,
      rating: 5.0,
      reviewsCount: 1,
      verified: true,
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    };

    setProviders([newProvider, ...providers]);
    setShowRegisterModal(false);
    setFormData({ name: '', category: 'የቧንቧ ስራ (Plumbing)', location: 'ቀበሌ 01', phone: '', experience: '', bio: '' });
    alert('በተሳካ ሁኔታ ተመዝግበዋል! SiraConnect እንኳን ደህና መጡ።');
  };

  // Filter Logic
  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          provider.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          provider.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || provider.category.includes(selectedCategory);
    const matchesLocation = selectedLocation === 'All' || provider.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-emerald-700 text-white shadow-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Building2 className="w-8 h-8" />
            <span className="text-2xl font-bold tracking-wide">SiraConnect</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline text-xs bg-emerald-800 px-3 py-1 rounded-full border border-emerald-600">
              💼 አሰር እና ሰራተኛ ማገናኛ
            </span>
            <button 
              onClick={() => setShowRegisterModal(true)}
              className="bg-white text-emerald-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-emerald-50 transition flex items-center space-x-1"
            >
              <UserPlus className="w-4 h-4" />
              <span>ባለሙያ ነኝ (ተመዝገብ)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extxl font-bold mb-4">የእጅ ባለሙያዎችን በአቅራቢያዎ ያግኙ</h1>
          <p className="text-emerald-100 mb-8 text-base md:text-lg">
            የቧንቧ፣ የመብራት፣ የቀለም እና የጽዳት ባለሙያዎችን በቀላሉ አገናኝተው በስራዎ ላይ ፍቱን መፍትሔ ያግኙ።
          </p>

          {/* Search Box */}
          <div className="bg-white p-3 rounded-xl shadow-lg flex flex-col md:flex-row gap-3">
            <div className="flex items-center flex-1 bg-slate-100 px-3 py-2 rounded-lg">
              <Search className="w-5 h-5 text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="ሙያ ወይም ስም ይፈልጉ (ለምሳሌ፡ የቧንቧ)..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent w-full focus:outline-none text-slate-800"
              />
            </div>
            
            <select 
              value={selectedLocation} 
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-slate-100 px-4 py-2 rounded-lg focus:outline-none text-slate-700 font-medium"
            >
              <option value="All">ሁሉም ሰፈሮች/ቀበሌዎች</option>
              <option value="ቀበሌ 01">ቀበሌ 01</option>
              <option value="ቀበሌ 02">ቀበሌ 02</option>
              <option value="ቀበሌ 04">ቀበሌ 04</option>
              <option value="ቀበሌ 05">ቀበሌ 05</option>
            </select>
          </div>
        </div>
      </section>

      {/* Categories Filter Tabs */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-none">
          {['All', 'የቧንቧ', 'የመብራት', 'የቀለም', 'የጽዳት'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium whitespace-nowrap transition shadow-sm ${
                selectedCategory === cat 
                  ? 'bg-emerald-600 text-white shadow-emerald-200' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'All' ? 'ሁሉም ሙያዎች' : cat + ' ስራ'}
            </button>
          ))}
        </div>
      </section>

      {/* Main Grid: Providers Listings */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">የተገኙ ባለሙያዎች ({filteredProviders.length})</h2>
          <span className="text-xs text-slate-500 bg-slate-200 px-3 py-1 rounded-full">
            💡 SiraConnect 10% የኮሚሽን ወይም ወርሃዊ ምዝገባ አለው
          </span>
        </div>

        {filteredProviders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-200">
            <p className="text-slate-500 text-lg mb-2">ምንም ባለሙያ አልተገኘም</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedLocation('All'); }}
              className="text-emerald-600 font-semibold hover:underline"
            >
              ፍለጋውን እንደገና ጀምር
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map(provider => (
              <div key={provider.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="p-5 flex items-start space-x-4">
                    <img 
                      src={provider.image} 
                      alt={provider.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow-inner"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-slate-800 flex items-center">
                          {provider.name}
                          {provider.verified && (
                            <ShieldCheck className="w-4 h-4 text-emerald-600 ml-1 fill-emerald-100" title="የተረጋገጠ ባለሙያ" />
                          )}
                        </h3>
                      </div>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md inline-block mt-1">
                        {provider.category}
                      </span>
                      <div className="flex items-center text-xs text-slate-500 mt-2 space-x-2">
                        <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" />{provider.location}</span>
                        <span>•</span>
                        <span>ልምድ: {provider.experience}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-3">
                    <p className="text-sm text-slate-600 line-clamp-2">{provider.bio}</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 p-4 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center text-amber-500 text-sm font-bold">
                    <Star className="w-4 h-4 fill-amber-400 mr-1" />
                    <span>{provider.rating}</span>
                    <span className="text-slate-400 font-normal text-xs ml-1">({provider.reviewsCount} ግምገማ)</span>
                  </div>
                  
                  <a 
                    href={`tel:${provider.phone}`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition flex items-center space-x-1 shadow-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>ደውል</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-800 flex items-center">
                <UserPlus className="w-5 h-5 text-emerald-600 mr-2" />
                የባለሙያ ምዝገባ ቅጽ
              </h3>
              <button 
                onClick={() => setShowRegisterModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">ሙሉ ስም</label>
                <input 
                  type="text" 
                  placeholder="ለምሳሌ፡ ከበደ አበበ" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">የሙያ ዘርፍ</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="የቧንቧ ስራ (Plumbing)">የቧንቧ ስራ</option>
                    <option value="የመብራት ስራ (Electrical)">የመብራት ስራ</option>
                    <option value="የቀለም ቅብ (Painting)">የቀለም ቅብ</option>
                    <option value="የቤት እጥባ እና ጽዳት (Cleaning)">የቤት ጽዳት</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">ሰፈር / ቀበሌ</label>
                  <select 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="ቀበሌ 01">ቀበሌ 01</option>
                    <option value="ቀበሌ 02">ቀበሌ 02</option>
                    <option value="ቀበሌ 03">ቀበሌ 03</option>
                    <option value="ቀበሌ 04">ቀበሌ 04</option>
                    <option value="ቀበሌ 05">ቀበሌ 05</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">ስልክ ቁጥር</label>
                  <input 
                    type="text" 
                    placeholder="+251 9..." 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">የስራ ልምድ</label>
                  <input 
                    type="text" 
                    placeholder="ለምሳሌ፡ 4 ዓመት" 
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">ስለ ሙያዎ አጭር መግለጫ</label>
                <textarea 
                  rows="3"
                  placeholder="የሰሯቸውን ስራዎች እና መግለጫ ይጻፉ..."
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-xs text-emerald-800">
                ⚠️ በማስገባትዎ ለ SiraConnect የ 10% የኮሚሽን ወይም የወርሃዊ አባልነት ደንብ ተስማምተዋል ።
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowRegisterModal(forRegisterModal = false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                  ተወው
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow transition"
                >
                  ተመዝገብ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 text-center text-sm border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <p className="font-semibold text-lg mb-1">SiraConnect</p>
          <p className="text-slate-400 text-xs">ሰራን ከ አሰራር ጋር በፈጣን እና አስተማማኝ ሁኔታ ማገናኛ ፕላትፎርም።</p>
          <p className="text-slate-500 text-xs mt-4">© 2026 SiraConnect. መብቱ በህግ የተጠበቀ ነው።</p>
        </div>
      </footer>
    </div>
  );
}
