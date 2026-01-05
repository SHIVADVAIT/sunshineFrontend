import React, { useState, useEffect } from 'react';
import ReplyToMessage from '../components/ReplyToMessage';
import Pagination from '../components/Pagination';
import { 
  getAllMessages,DeleteMessages
} from '../../services/AdminMessage';
import { 
  FaEnvelope, 
  FaEnvelopeOpen, 
  FaReply, 
  FaTrash, 
  FaEye,
  FaFilter,
  FaSearch,
  FaDownload,
  FaCheck
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Messages() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletedId, setDeletedId] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  
  const [tabCounts, setTabCounts] = useState({
    all: 0,
    new: 0,
    resolved: 0
  });

  // Fetch messages from API
  useEffect(() => {
    fetchMessages();
  }, [selectedTab]);

  // Fetch tab counts on initial load
  useEffect(() => {
    fetchTabCounts();
  }, []);

  // Refetch when pagination changes
  useEffect(() => {
    if (pagination.page > 1) {
      fetchMessages();
    }
  }, [pagination.page]);

  // Handle search button click
  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchMessages();
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      
      // Fetch messages for current tab
      const response = await getAllMessages({ 
        page: pagination.page, 
        limit: pagination.limit,
        search: searchTerm,
        status: selectedTab === 'all' ? '' : selectedTab
      });
      
      const fetchedMessages = response.data.data || [];
      const fetchedPagination = response.data.pagination || pagination;
      
      setMessages(fetchedMessages);
      
      // If current page is empty but not page 1, go to page 1
      if (fetchedMessages.length === 0 && pagination.page > 1 && fetchedPagination.total > 0) {
        setPagination(prev => ({ ...prev, page: 1 }));
        return; // Will trigger useEffect to refetch with page 1
      }
      
      setPagination(fetchedPagination);
      
      // Update current tab count
      setTabCounts(prev => ({
        ...prev,
        [selectedTab]: fetchedPagination.total || 0
      }));
      
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages');
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const fetchTabCounts = async () => {
    try {
      // Fetch counts for all tabs when component loads
      const [allResponse, newResponse, resolvedResponse] = await Promise.all([
        getAllMessages({ page: 1, limit: 1, search: '', status: '' }),
        getAllMessages({ page: 1, limit: 1, search: '', status: 'new' }),
        getAllMessages({ page: 1, limit: 1, search: '', status: 'resolved' })
      ]);

      setTabCounts({
        all: allResponse.data.pagination?.total || 0,
        new: newResponse.data.pagination?.total || 0,
        resolved: resolvedResponse.data.pagination?.total || 0
      });
    } catch (err) {
      console.error('Error fetching tab counts:', err);
    }
  };

  const handleOpenReplyModal = () => {
  if (!selectedMessage) {

    return;
  }
  setIsReplyModalOpen(true);
};

const handleCloseReplyModal = () => {
  setIsReplyModalOpen(false);
};

const handleSendReply = async (replyData) => {
  try {
    // Close the reply modal
    setIsReplyModalOpen(false);
    // Refresh the messages list and tab counts to show updated status
    await fetchMessages();
    await fetchTabCounts();
  } catch (error) {
    toast.error('Failed to send reply');
  }
};

const markAsResolved = async (messageId) => {
  try {
    // Since we're not using updateMessageStatus function, just show success
    toast.success('Mark as resolved functionality will be implemented soon!');
  } catch (error) {
    toast.error('Failed to update message status');
  }
};

  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await DeleteMessages(messageId);
      // Check response structure - AdminMessage.js returns response wrapped in data
      if(response.data && response.data.success){
        toast.success("Message deleted successfully!");
        
        // Clear selected message if it was the deleted one
        if (selectedMessage && selectedMessage.id === messageId) {
          setSelectedMessage(null);
        }
        
        // Refresh the messages list and tab counts immediately
        await fetchMessages();
        await fetchTabCounts();
      } else {
        toast.error("Failed to delete message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handleJumpToFirst = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleJumpToLast = () => {
    setPagination(prev => ({ ...prev, page: prev.totalPages }));
  };  const tabs = [
    { id: 'all', name: 'All Messages', count: tabCounts.all },
    { id: 'new', name: 'New', count: tabCounts.new },
    { id: 'resolved', name: 'Resolved', count: tabCounts.resolved }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return <FaEnvelope className="text-blue-500" />;
      case 'resolved': return <FaCheck className="text-green-500" />;
      default: return <FaEnvelope className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-400"></div>
          <p className="mt-4 text-gray-600">Loading Messages...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => {
              setError(null);
              fetchMessages();
            }}
            className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Messages</h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">Manage customer inquiries and communications</p>
          </div>
          <div className="flex space-x-2">
            {/* <button 
              onClick={() => toast.success('Messages exported successfully!')}
              className="bg-green-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center text-xs sm:text-sm"
            >
              <FaDownload className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Export
            </button> */}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 sm:mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-4 sm:space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedTab(tab.id);

                }}
                className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  selectedTab === tab.id
                    ? 'border-red-400 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
          <input
            type="text"
            placeholder="Search by name, email, or project type..."
            className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          {loading && searchTerm && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
            </div>
          )}
        </div>
        <button 
          onClick={handleSearch}
          className="px-3 sm:px-4 py-2 sm:py-3 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors flex items-center text-xs sm:text-sm font-medium"
        >
          <FaSearch className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-3 sm:p-4 lg:p-6">
            <div className="space-y-3 sm:space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => {
                    setSelectedMessage(message);

                  }}
                  className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedMessage?.id === message.id ? 'border-red-400 bg-red-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <div className="mt-1">
                        {getStatusIcon(message.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs sm:text-sm font-medium text-gray-900">{message.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(message.status)}`}>
                            {message.status}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500">{message.email}</p>
                        <p className="text-xs sm:text-sm text-gray-700 mt-1 font-medium">{message.project_type}</p>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{message.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs sm:text-sm text-gray-500">{formatDate(message.created_at)}</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs sm:text-sm text-gray-500">{message.company || 'N/A'}</span>
                            <span className="text-xs sm:text-sm text-gray-500">•</span>
                            <span className="text-xs sm:text-sm text-gray-500">{message.budget}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {messages.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <FaEnvelope className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <p className="text-xs sm:text-sm text-gray-500">No messages found</p>
              </div>
            )}

            {/* Pagination */}
            {pagination.total > 0 && (
              <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button
                    onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
                    disabled={pagination.page === 1}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(Math.min(pagination.totalPages, pagination.page + 1))}
                    disabled={pagination.page === pagination.totalPages}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(pagination.page * pagination.limit, pagination.total)}
                      </span>{' '}
                      of <span className="font-medium">{pagination.total}</span> results
                    </p>
                  </div>
                  {pagination.totalPages > 1 && (
                    <div>
                      <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        onPageChange={handlePageChange}
                        onJumpToFirst={handleJumpToFirst}
                        onJumpToLast={handleJumpToLast}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        className="justify-center"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Message Details */}
        <div className="bg-white rounded-lg shadow">
          {selectedMessage ? (
            <div className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">Message Details</h3>
                <div className="flex space-x-2">
                  <button 
                  
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaReply className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Name</label>
                  <p className="text-xs sm:text-sm text-gray-900">{selectedMessage.name}</p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Email</label>
                  <p className="text-xs sm:text-sm text-gray-900">{selectedMessage.email}</p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-xs sm:text-sm text-gray-900">{selectedMessage.country_code} {selectedMessage.phone}</p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Company</label>
                  <p className="text-xs sm:text-sm text-gray-900">{selectedMessage.company || 'N/A'}</p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Project Type</label>
                  <p className="text-xs sm:text-sm text-gray-900 capitalize">{selectedMessage.project_type}</p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Budget Range</label>
                  <p className="text-xs sm:text-sm text-gray-900">{selectedMessage.budget}</p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(selectedMessage.status)}`}>
                    {selectedMessage.status}
                  </span>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Message</label>
                  <p className="text-xs sm:text-sm text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Date</label>
                  <p className="text-xs sm:text-sm text-gray-900">{formatDate(selectedMessage.created_at)}</p>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                <button 
                  onClick={handleOpenReplyModal}
                  className="w-full bg-red-400 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-red-500 transition-colors text-xs sm:text-sm font-medium"
                >
                  Reply to Message
                </button>
                
              </div>
            </div>
          ) : (
            <div className="p-3 sm:p-4 lg:p-6 text-center">
              <FaEye className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-xs sm:text-sm text-gray-500">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>

      {isReplyModalOpen && selectedMessage && (
  <ReplyToMessage
    id={selectedMessage.id}
    email={selectedMessage.email}
    name={selectedMessage.name}
    message={selectedMessage} 
    onClose={handleCloseReplyModal}
    onSend={handleSendReply}
  />
)}

      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
