import React, { useEffect, useRef, useState } from 'react'
import { HiOutlineDownload } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import DataTable from 'react-data-table-component';
import { PiCaretUpDownFill } from "react-icons/pi";
import { Data } from '../../Components/compliance list/data'
import { columns } from "../../Components/compliance list/Columns";
import { Link } from 'react-router-dom';
import { FaSliders } from 'react-icons/fa6';
import CustomPagination from '../../Components/CustomPagination';
import ActionMenu from '../../Components/category/ActionMenu';
import { IoCalendarOutline } from 'react-icons/io5';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const ComplianceList = () => {
  const [data] = useState(Data)
  const [downMenu, setDownMenu] = useState(false)
  const [search, setSearch] = useState('')
  const [count, setCount] = useState(0)
  const [showMenu, setShowMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectValue, setSelectValue] = useState({
    compliance: '',
    formname: '',
    acttype: '',
    frequency: ''
  });


  const [filters, setFilters] = useState({
    sno: true,
    natureofactivity: true,
    activity: true,
    formname: true,
    applicablelaw: true,
    acttype: true,
    actualfilling: true,
    lastfill: true,
    frequency: true,
    section: false,
    action: true,
  });
  const handleCheckboxChange = (filterName) => {
    setFilters({
      ...filters,
      [filterName]: !filters[filterName],
    });
  };


  // const [selectValue,setSelectValue]=useState({activity: "",
  //       formname: "",
  //       applicablelaw: "",
  //       acttype: "",
  //       priority: "",
  //       frequency: ""})



  const filter = Data.filter((row) => {
    return (
      (selectValue.compliance ? row.natureOfActivity === selectValue.compliance : true) &&
      (selectValue.formname ? row.nameOfForm === selectValue.formname : true) &&
      (selectValue.acttype ? row.typeOfAct === selectValue.acttype : true) &&
      // (selectValue.priority ? row.priority === selectValue.priority:true)&&
      (selectValue.frequency ? row.fillingFrequency === selectValue.frequency : true) &&
      (row.natureOfActivity.toLowerCase().includes(search.toLowerCase()) || row.activity.toLowerCase().includes(search.toLowerCase()) ||
        row.nameOfForm.toLowerCase().includes(search.toLowerCase()) || row.typeOfAct.toLowerCase().includes(search.toLowerCase()) ||
        row.applicationLaw.toLowerCase().includes(search.toLowerCase()) || row.section.toLowerCase().includes(search.toLowerCase()) ||
        row.actualFillingFrequency.toLowerCase().includes(search.toLowerCase()) || row.lastFilledDate.toLowerCase().includes(search.toLowerCase()) ||
        row.fillingFrequency.toLowerCase().includes(search.toLowerCase()))
    );
  })

  const totalPages = Math.ceil(filter.length / itemsPerPage)
  const pagination = filter.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  // useEffect(()=>{setCount(selectValue.length)},[selectValue])
  const customStyles = {
    rows: {
      style: {
        minHeight: '55px',
      },
    },
    headCells: {
      style: {
        backgroundColor: '#000',
        color: '#fff',

      }
    },
    cells: {
      style: {
        overflowWrap: 'break-word'
        //     paddingLeft: '30px',
        //     paddingRight: '80px',
        //     fontSize:'14px'
      }
    },
  }
  // const downloadPdf = () => {
  //   const input = pdfref.current;
  //   html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF('p', 'pt', 'a4');
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();

  //     const imgWidth = canvas.width;
  //     const imgHeight = canvas.height;
  //     const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  //     const finalWidth = imgWidth * ratio;
  //     const finalHeight = imgHeight * ratio;

  //     pdf.addImage(imgData, 'PNG', 0, 0, finalWidth, finalHeight);
  //     pdf.save("compliance-list.pdf");
  //   });
  // };

  // const downloadCsv = () => {
  //   const csvData = [
  //     ["SNO", "Nature Of Activity", "Activity", "Name of the Form", "Section", "Applicable Law", "Type of Act", "Actual Filing Frequency", "Last Filed Date", "Filing Frequency"],
  //     ...data.map(row => [
  //       row.sno,
  //       row.natureOfActivity,
  //       row.activity,
  //       row.nameOfForm,
  //       row.section,
  //       row.applicationLaw,
  //       row.typeOfAct,
  //       row.actualFillingFrequency,
  //       row.lastFilledDate,
  //       row.fillingFrequency,
  //     ])
  //   ];

  //   const csvContent = "data:text/csv;charset=utf-8," + csvData.map(e => e.join(",")).join("\n");
  //   const encodedUri = encodeURI(csvContent);
  //   const link = document.createElement("a");
  //   link.setAttribute("href", encodedUri);
  //   link.setAttribute("download", "compliance-list.csv");
  //   document.body.appendChild(link); // Required for FF
  //   link.click();
  //   document.body.removeChild(link); // Clean up
  // };
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filter, currentPage, totalPages])
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  return (
    <div className='p-2 -z-50' >
      <div className='flex flex-col justify-center gap/-2 items-start lg:flex-row lg:items-center lg:justify-between'>
        <h2 className='font-bold  text-lg'>Compliance List</h2>
        {/* <div className='flex gap-3 items-center'>
          <Link to="/compliance"><button className='py-2 w-44 lg:w-40 rounded-md text-white bg-primary'>Create Compliance</button> </Link>
        </div> */}
      </div>

      <div className='relative py-6 flex justify-start items-center flex-wrap gap-4 mb-4'>
        {filters.natureofactivity && (<select className='w-full lg:w-40 bg-selectbg py-2 px-4 rounded-md border border-bordergray' value={selectValue.compliance} onChange={(e) => setSelectValue({ ...selectValue, compliance: e.target.value })}>
          <option value="">compliance</option>
          {/* {Data.map((item)=><option value={item.natureOfActivity}>{item.natureOfActivity}</option>)} */}
          {[...new Set(Data.map((data) => data.natureOfActivity))].map((natureofactivity, index) => (
            <option key={index} value={natureofactivity}>{natureofactivity}</option>
          ))}
        </select>)}
        {filters.formname && (
          <select className='w-full lg:w-40 bg-selectbg py-2 px-4 rounded-md border border-bordergray' value={selectValue.formname} onChange={(e) => setSelectValue({ ...selectValue, formname: e.target.value })}>
            <option value="">Name of the form</option>
            {/* {Data.map((item)=><option value={item.nameOfForm}>{item.nameOfForm}</option>)} */}
            {[...new Set(Data.map((data) => data.nameOfForm))].map((formname, index) => (
              <option key={index} value={formname}>{formname}</option>
            ))}
          </select>)}
        {filters.acttype && (
          <select className='w-full lg:w-40 bg-selectbg py-2 px-4 rounded-md border border-bordergray' value={selectValue.acttype} onChange={(e) => setSelectValue({ ...selectValue, acttype: e.target.value })}>
            <option value="">Type of Act</option>
            {/* {Data.map((item)=><option value={item.typeOfAct}>{item.typeOfAct}</option>)} */}
            {[...new Set(Data.map((data) => data.typeOfAct))].map((acttype, index) => (
              <option key={index} value={acttype}>{acttype}</option>
            ))}
          </select>)}
        {filters.priority && (
          <select className='w-full lg:w-40 bg-selectbg py-2 px-4 rounded-md border border-bordergray'
          // value={selectValue.priority} onChange={(e)=>setSelectValue({...selectValue,priority:e.target.value})}
          >
            <option value="">Priority</option>
            {/* {Data.map((item)=><option value={item.priority}>{item.priority}</option>)} */}
          </select>)}
        {filters.frequency && (
          <select className='w-full lg:w-40 bg-selectbg py-2 px-4 rounded-md border border-bordergray' value={selectValue.frequency} onChange={(e) => setSelectValue({ ...selectValue, frequency: e.target.value })}>
            <option value="">Frequency</option>
            {/* {Data.map((item)=><option value={item.fillingFrequency}>{item.fillingFrequency}</option>)} */}
            {[...new Set(Data.map((data) => data.fillingFrequency))].map((frequency, index) => (
              <option key={index} value={frequency}>{frequency}</option>
            ))}
          </select>)}
        <span className='w-full lg:w-40 relative'>
          <input type='text' className=' focus-visible focus-visible:outline-none w-full py-1.5 ps-8 border border-bordergray rounded-md ' placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
          <IoIosSearch className='  absolute top-2 left-2' size={20} />
        </span>
        <span className='relative'>
          <FaSliders size={35} className="p-1.5 bg-white border border-gray-400 rounded-md cursor-pointer" onClick={() => setShowMenu(!showMenu)} />
          <div className='absolute z-30 top-10 lg:'>
            {showMenu &&
              (
                <div className='border border-bordergray rounded-md p-4 w-56 bg-white shadow-md'>
                  <label >
                    <input type='checkbox' checked={filters.sno} onChange={() => handleCheckboxChange('sno')} className='me-3 accent-black' />
                    Sno
                  </label><br />
                  <label >
                    <input type='checkbox' checked={filters.natureofactivity} onChange={() => handleCheckboxChange('natureofactivity')} className='me-3 accent-black' />
                    Nature of Activity
                  </label><br />
                  <label >
                    <input type='checkbox' checked={filters.activity} onChange={() => handleCheckboxChange('activity')} className='me-3 accent-black' />
                    Activity
                  </label><br />
                  <label>
                    <input type='checkbox' checked={filters.formname} onChange={() => handleCheckboxChange('formname')} className='me-3 accent-black' />
                    Name of the Form
                  </label><br />
                  <label>
                    <input type='checkbox' checked={filters.section} onChange={() => handleCheckboxChange('section')} className='me-3 accent-black' />
                    Section
                  </label><br />
                  <label >
                    <input type='checkbox' checked={filters.applicablelaw} onChange={() => handleCheckboxChange('applicablelaw')} className='me-3 accent-black' />
                    Applicable Law
                  </label><br />
                  <label>
                    <input type='checkbox' checked={filters.acttype} onChange={() => handleCheckboxChange('acttype')} className='me-3 accent-black' />
                    Type of Act
                  </label><br />
                  <label className='text-nowrap' >
                    <input type='checkbox' checked={filters.actualfilling} onChange={() => handleCheckboxChange('actualfilling')} className='me-3 accent-black' />
                    Actual Filling Frequency
                  </label><br />

                  <label >
                    <input type='checkbox' checked={filters.lastfill} onChange={() => handleCheckboxChange('lastfill')} className='me-3 accent-black' />
                    Last Filed Date
                  </label><br />
                  <label>
                    <input type='checkbox' checked={filters.frequency} onChange={() => handleCheckboxChange('frequency')} className='me-3 accent-black' />
                    Priority
                  </label><br />

                </div>
              )}
          </div>
        </span>
      </div>

      <div className='w-auto -z-40'>

        <DataTable
          columns={[
            {
              name: 'SNO',
              selector: (row) => row.sno,
              sortable: true,
              width: '100px',
              omit: filters.sno == false,

            },
            {
              name: 'Nature Of Activity',
              selector: (row) => row.natureOfActivity,
              sortable: true,
              omit: filters.natureofactivity == false,

            },
            {
              name: 'Activity',
              selector: (row) => row.activity,
              sortable: true,
              omit: filters.activity == false,

            },
            {
              name: 'Name of the Form',
              selector: (row) => row.nameOfForm,
              sortable: true,
              omit: filters.formname == false,
              grow: 2
            },
            {
              name: 'Section',
              selector: (row) => row.section,
              sortable: true,
              omit: filters.section == false,

            },
            {
              name: 'Applicable Law',
              selector: (row) => row.applicationLaw,
              sortable: true,
              omit: filters.applicablelaw == false,
              grow: 3
            },
            {
              name: 'Type of Act',
              selector: (row) => row.typeOfAct,
              sortable: true,
              width: '120px',
              omit: filters.acttype == false,
            },
            {
              name: 'Actual Filing Frequency',
              selector: (row) => row.actualFillingFrequency,
              sortable: true,
              omit: filters.actualfilling == false,

            },
            {
              name: 'Last Filed Date',
              cell: (row) => <div className='flex gap-2 items-center justify-start'><p>{row.lastFilledDate}</p><IoCalendarOutline className='text-black' /></div>,
              sortable: true,
              grow: 1.5,
              omit: filters.lastfill == false,

            },
            {
              name: 'Filling Frequency',
              selector: (row) => row.fillingFrequency,
              sortable: true,
              grow: 1.5,
              omit: filters.frequency == false,
            },
            {
              name: 'Actions',
              cell: (row) => <ActionMenu row={row} />,
              ignoreClick: true,
              // right:true,
              width: '100px',
            },
          ]} sortIcon={<PiCaretUpDownFill />}
          data={pagination}
          responsive
          selectableRows
          fixedHeader
          highlightOnHover
          customStyles={customStyles} >
        </DataTable>
      </div>
      <div className="py-2 lg:flex lg:justify-between items-center w-auto flex-row justify-center">
        <select value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}
          className="p-2 rounded w-24"
        >
          <option value="10">Show 10</option>
          <option value="20">Show 20</option>
          <option value="30">Show 30</option>
        </select>
        <CustomPagination page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>



    </div>
  )
}
export default ComplianceList;