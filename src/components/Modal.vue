<script setup></script>

<template>
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
  >
    <div
      className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
    >
      <div
        className="p-6 border-b border-gray-200 flex justify-between items-center"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
          <p className="text-md text-gray-600">{job.department}</p>
        </div>
        <button
          onClick="{onClose}"
          className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6 overflow-y-auto">
        <div
          className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-700 mb-6"
        >
          {job.location && (
          <div className="flex items-center">
            <LocationMarkerIcon className="w-4 h-4 mr-1.5 text-gray-500" />
            <span>{job.location}</span>
          </div>
          )}
          <div className="flex items-center">
            <CurrencyDollarIcon className="w-4 h-4 mr-1.5 text-gray-500" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-1.5 text-gray-500" />
            <span>Posted {job.postedAgo}</span>
          </div>
          {job.type && (
          <div className="flex items-center">
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {job.type}
            </span>
          </div>
          )}
        </div>

        <div className="prose max-w-none text-gray-600">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Job Description
          </h3>
          <p>{job.description || 'No description provided.'}</p>
        </div>
      </div>

      <div
        className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg flex justify-end space-x-3"
      >
        <button
          onClick="{onClose}"
          type="button"
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Close
        </button>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Apply Now
        </button>
      </div>
    </div>
  </div>
</template>
