'use client'

import React, { useState,useEffect } from 'react'
import SummarizedTable from './SummarizedTable'
import DetailedTable from './DetailedTable693'
import EntryEditForm from './EntryEditForm693'
import '../css/Page508.css'

const Page693 = () => {
  const [isDetailedView, setIsDetailedView] = useState(false)
  const [isEntryFormView, setIsEntryFormView] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const formattedDate = sevenDaysAgo.toISOString().split('T')[0];

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 0);
  const toformattedDate = currentDate.toISOString().split('T')[0];
  const [filterData, setFilterData] = useState({
    machineno: '',
    fromDate: formattedDate,
    toDate: toformattedDate 
  });

  const [summaryData, setSummaryData] = useState([])

 

  const handleRowClick = (rowData) => {
    console.log('Row clicked:', rowData)
    setSelectedRowData(rowData)
    setIsDetailedView(true)
  }

  const handleDetailedRowClick = (rowData) => {
    setSelectedRowData(rowData)
    setIsEntryFormView(true)
  }

  const handleEntryFormSubmit = (updatedData) => {
    setIsEntryFormView(false)
    // Here you would typically update the data in your backend and then refresh the table data
  }

  const handleCloseDetailed = () => {
    setIsDetailedView(false)
  
  }

  const handleCloseEntryForm = () => {
    setIsEntryFormView(false)
  }

  const handleFilterChange = (newFilterData) => {
    setFilterData(newFilterData);
  }

  return (
    <div className="page508">
      <header className="page508-header">
        <h1>Dashboard</h1>
      </header>

      <main className="page508-content">
        <div className="content-container">
          {isEntryFormView ? (
            <EntryEditForm
              rowData={selectedRowData}
              onSubmit={handleEntryFormSubmit}
              onClose={handleCloseEntryForm}
            />
          ) : isDetailedView ? (
            <DetailedTable
              filterData={selectedRowData}
              onRowClick={handleDetailedRowClick}
              onClose={handleCloseDetailed}
            />
          ) : (
            <SummarizedTable
              onRowClick={handleRowClick}
              onDataReceived={setSummaryData}
              filterData={filterData}
              onFilterChange={handleFilterChange}
            />
          )}
        </div>
      </main>

      <footer className="page508-footer">
        <p>&copy; 2024 Dashboard. All rights reserved  ...</p>
      </footer>
    </div>
  )
}

export default Page693