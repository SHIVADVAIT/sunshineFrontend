// src/components/ReplyToMessage.jsx
import React, { useState } from 'react';
import { FaTimes, FaPaperPlane, FaReply } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ReplyMessages} from '../../services/AdminMessage.js';

const ReplyToMessage = ({id, email,name, message, onClose, onSend }) => {
  const [replyContent, setReplyContent] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) {
      toast.error('Reply content cannot be empty');
      return;
    }
    console.log("Replying to message:", id, "with content:", replyContent);
    
    setIsSending(true);
    
    try {
      // Simulate API call
      
      // In a real app, you would send this to your backend
      const payload = {
        id: id,
        reply: replyContent,
      }; 
      const response = await ReplyMessages({ replyData: payload });
      if(response.data && response.data.success){
        toast.success('Reply sent successfully!');
        setReplyContent(''); // Clear the form
        onClose(); // Close the modal
        if (onSend) {
          onSend(); // Refresh parent component if callback exists
        }
      } else {
        toast.error('Failed to send reply. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to send reply. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    setReplyContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative z-[60]">
        {/* Fixed Modal Header */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-3 sm:p-4 rounded-t-xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaReply className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <div>
                <h2 className="text-sm sm:text-base font-bold">Reply to Message</h2>
                <p className="text-xs sm:text-sm text-blue-100 mt-1">
                  Responding to customer inquiry
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-blue-200 transition-colors p-1"
            >
              <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
        
        {/* Modal Content */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {/* Message Info Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-semibold text-lg">
                  {message.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-semibold text-gray-900">
                  {message.name}
                </h4>
                <p className="text-sm text-gray-600 mb-2">{message.email}</p>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                
                  <p className="text-sm font-medium text-gray-700 mb-1">Message:</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{message.message}</p>
                </div>
              </div>
            </div>
          </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Reply
            </label>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-red-400 transition-colors text-sm resize-none"
              placeholder="Type your reply here..."
            />
          </div>
        </form>
        </div>

        {/* Fixed Modal Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="reply-form"
              onClick={handleSubmit}
              disabled={isSending || !replyContent.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors flex items-center text-sm font-medium"
            >
              {isSending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane className="w-4 h-4 mr-2" />
                  Send Reply
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyToMessage;