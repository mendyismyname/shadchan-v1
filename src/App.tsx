import React, { useState } from 'react';
import { Bell, MessageCircle, Calendar, Heart, User, ArrowLeft, Coffee, UserCheck, Clock } from 'lucide-react';

const ProfilePage = ({ userId, onBack, onExpressInterest, currentUserStatus }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <button onClick={onBack} className="mb-4 flex items-center text-blue-500">
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>
      <img src={`/api/placeholder/150/150`} alt={`User ${userId}`} className="w-32 h-32 rounded-full mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-center mb-4">User {userId}</h2>
      <div className="space-y-2">
        <p><strong>Age:</strong> 28</p>
        <p><strong>Location:</strong> New York</p>
        <p><strong>Occupation:</strong> Software Developer</p>
        <p><strong>Jewish Observance:</strong> Modern Orthodox</p>
        <p><strong>Hashkafa:</strong> Centrist</p>
        <p><strong>Languages:</strong> English, Hebrew</p>
        <p><strong>Bio:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      {currentUserStatus === 'open' && (
        <button 
          onClick={onExpressInterest}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full w-full"
        >
          Express Interest
        </button>
      )}
    </div>
  );
};

const DatePlanner = ({ matchId, onBack }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');

  const handleSubmit = () => {
    console.log('Date planned:', { matchId, selectedDate, selectedTime, selectedActivity });
    onBack();
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <button onClick={onBack} className="mb-4 flex items-center text-blue-500">
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Plan a Date with Match {matchId}</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Date:</label>
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Time:</label>
          <input 
            type="time" 
            value={selectedTime} 
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Activity:</label>
          <select 
            value={selectedActivity} 
            onChange={(e) => setSelectedActivity(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select an activity</option>
            <option value="coffee">Coffee</option>
            <option value="dinner">Dinner</option>
            <option value="museum">Museum Visit</option>
            <option value="park">Walk in the Park</option>
          </select>
        </div>
        <button 
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded-full w-full"
        >
          Suggest Date
        </button>
      </div>
    </div>
  );
};

const MatchmakerDashboard = ({ onBack }) => {
  const matches = [
    { id: 1, user1: "Alice", user2: "Bob", status: "chatting" },
    { id: 2, user1: "Charlie", user2: "Diana", status: "dating" },
    { id: 3, user1: "Eve", user2: "Frank", status: "new" },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <button onClick={onBack} className="mb-4 flex items-center text-blue-500">
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Matchmaker Dashboard</h2>
      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="border-b pb-4">
            <h3 className="font-bold">{match.user1} & {match.user2}</h3>
            <p className="text-sm text-gray-600">Status: {match.status}</p>
            <div className="mt-2 space-x-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Send Suggestion</button>
              <button className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">Schedule Follow-up</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DateTracker = ({ onBack }) => {
  const milestones = [
    { id: 1, type: "first_date", date: "2023-06-15" },
    { id: 2, type: "exclusive", date: "2023-08-01" },
    { id: 3, type: "engaged", date: "2024-02-14" },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <button onClick={onBack} className="mb-4 flex items-center text-blue-500">
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Your Dating Journey</h2>
      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white mr-4">
              {milestone.type === "first_date" && <Coffee size={24} />}
              {milestone.type === "exclusive" && <UserCheck size={24} />}
              {milestone.type === "engaged" && <Heart size={24} />}
            </div>
            <div>
              <h3 className="font-bold">{milestone.type.replace('_', ' ').toUpperCase()}</h3>
              <p className="text-sm text-gray-600">{new Date(milestone.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AppPreview = () => {
  const [activeTab, setActiveTab] = useState('matches');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [currentView, setCurrentView] = useState('main');
  const [currentUserStatus, setCurrentUserStatus] = useState('open');

  const renderContent = () => {
    if (currentView === 'profile' && selectedProfile !== null) {
      return (
        <ProfilePage 
          userId={selectedProfile} 
          onBack={() => setCurrentView('main')}
          onExpressInterest={() => {
            console.log(`Expressed interest in User ${selectedProfile}`);
          }}
          currentUserStatus={currentUserStatus}
        />
      );
    }

    if (currentView === 'datePlanner') {
      return <DatePlanner matchId={selectedProfile} onBack={() => setCurrentView('main')} />;
    }

    if (currentView === 'matchmaker') {
      return <MatchmakerDashboard onBack={() => setCurrentView('main')} />;
    }

    if (currentView === 'dateTracker') {
      return <DateTracker onBack={() => setCurrentView('main')} />;
    }

    switch (activeTab) {
      case 'matches':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <img src={`/api/placeholder/150/150`} alt={`Match ${i}`} className="w-full h-40 object-cover rounded-lg mb-2" />
                <h3 className="font-bold">Match {i}</h3>
                <p className="text-sm text-gray-600">Age: 28 • Location: New York</p>
                <div className="mt-2 space-y-2">
                  <button 
                    onClick={() => {
                      setSelectedProfile(i);
                      setCurrentView('profile');
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full w-full"
                  >
                    View Profile
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedProfile(i);
                      setCurrentView('datePlanner');
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded-full w-full"
                  >
                    Plan a Date
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'messages':
        return (
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-bold mb-4">Messages</h2>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center mb-4 pb-4 border-b last:border-b-0">
                <img 
                  src={`/api/placeholder/50/50`} 
                  alt={`User ${i}`} 
                  className="w-12 h-12 rounded-full mr-4 cursor-pointer"
                  onClick={() => {
                    setSelectedProfile(i);
                    setCurrentView('profile');
                  }}
                />
                <div>
                  <h3 className="font-bold cursor-pointer" onClick={() => {
                    setSelectedProfile(i);
                    setCurrentView('profile');
                  }}>User {i}</h3>
                  <p className="text-sm text-gray-600">Latest message preview...</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'dates':
        return (
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-bold mb-4">Upcoming Dates</h2>
            {[1, 2].map((i) => (
              <div key={i} className="mb-4 pb-4 border-b last:border-b-0">
                <h3 className="font-bold cursor-pointer" onClick={() => {
                  setSelectedProfile(i);
                  setCurrentView('profile');
                }}>Date with Match {i}</h3>
                <p className="text-sm text-gray-600">Friday, 7:00 PM • Coffee Shop</p>
                <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-full">Confirm</button>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const renderMobileMenu = () => (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="flex justify-around py-2">
        <button onClick={() => {setActiveTab('matches'); setCurrentView('main');}} className={`p-2 ${activeTab === 'matches' && currentView === 'main' ? 'text-blue-500' : 'text-gray-500'}`}>
          <Heart size={24} />
        </button>
        <button onClick={() => {setActiveTab('messages'); setCurrentView('main');}} className={`p-2 ${activeTab === 'messages' && currentView === 'main' ? 'text-blue-500' : 'text-gray-500'}`}>
          <MessageCircle size={24} />
        </button>
        <button onClick={() => {setActiveTab('dates'); setCurrentView('main');}} className={`p-2 ${activeTab === 'dates' && currentView === 'main' ? 'text-blue-500' : 'text-gray-500'}`}>
          <Calendar size={24} />
        </button>
        <button onClick={() => setCurrentView('matchmaker')} className={`p-2 ${currentView === 'matchmaker' ? 'text-blue-500' : 'text-gray-500'}`}>
          <UserCheck size={24} />
        </button>
        <button onClick={() => setCurrentView('dateTracker')} className={`p-2 ${currentView === 'dateTracker' ? 'text-blue-500' : 'text-gray-500'}`}>
          <Clock size={24} />
        </button>
      </div>
    </nav>
  );
const renderDesktopMenu = () => (
    <nav className="hidden md:block w-64 bg-white shadow-lg h-screen fixed left-0 top-0 p-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">Matchmaking App</h1>
      <div className="space-y-4">
        <button onClick={() => {setActiveTab('matches'); setCurrentView('main');}} className={`flex items-center w-full p-2 ${activeTab === 'matches' && currentView === 'main' ? 'text-blue-500 bg-blue-100' : 'text-gray-500'} rounded`}>
          <Heart size={24} className="mr-2" /> Matches
        </button>
        <button onClick={() => {setActiveTab('messages'); setCurrentView('main');}} className={`flex items-center w-full p-2 ${activeTab === 'messages' && currentView === 'main' ? 'text-blue-500 bg-blue-100' : 'text-gray-500'} rounded`}>
          <MessageCircle size={24} className="mr-2" /> Messages
        </button>
        <button onClick={() => {setActiveTab('dates'); setCurrentView('main');}} className={`flex items-center w-full p-2 ${activeTab === 'dates' && currentView === 'main' ? 'text-blue-500 bg-blue-100' : 'text-gray-500'} rounded`}>
          <Calendar size={24} className="mr-2" /> Dates
        </button>
        <button onClick={() => setCurrentView('matchmaker')} className={`flex items-center w-full p-2 ${currentView === 'matchmaker' ? 'text-blue-500 bg-blue-100' : 'text-gray-500'} rounded`}>
          <UserCheck size={24} className="mr-2" /> Matchmaker
        </button>
        <button onClick={() => setCurrentView('dateTracker')} className={`flex items-center w-full p-2 ${currentView === 'dateTracker' ? 'text-blue-500 bg-blue-100' : 'text-gray-500'} rounded`}>
          <Clock size={24} className="mr-2" /> Date Tracker
        </button>
      </div>
    </nav>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {renderDesktopMenu()}
      <div className="md:ml-64">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 md:hidden">Matchmaking App</h1>
          <div className="flex items-center">
            <span className="mr-2">Status:</span>
            <select 
              value={currentUserStatus} 
              onChange={(e) => setCurrentUserStatus(e.target.value)}
              className="p-1 border rounded"
            >
              <option value="open">Open to Matches</option>
              <option value="dating">Currently Dating</option>
              <option value="engaged">Engaged</option>
              <option value="married">Married</option>
            </select>
          </div>
        </header>
        <main className="container mx-auto mt-8 px-4 pb-20 md:pb-8">
          {renderContent()}
        </main>
      </div>
      {renderMobileMenu()}
    </div>
  );
  };

  export default AppPreview;