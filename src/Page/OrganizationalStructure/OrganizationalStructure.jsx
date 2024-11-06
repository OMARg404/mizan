import React, { useEffect, useState } from "react";
import "./OrganizationalStructure.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';

import {
  faChevronDown,
  faChevronRight,
  faEdit,
  faSearch,
  faPlus,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getAllAdministrativeUnits,
  createAdministrativeUnit,
} from "../../services/api"; // Import the API functions

const OrganizationalStructurePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [structureData, setStructureData] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    parentUnit: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("jwtToken"));
        if (!token) {
          alert("No token found, please log in.");
          return;
        }
        const data = await getAllAdministrativeUnits(token);
        setStructureData(data);
      } catch (error) {
        console.error(
          "Error fetching data: ",
          error.response ? error.response.data : error.message
        );
        alert(
          "Failed to fetch data: " +
            (error.response ? error.response.data.message : "Server error.")
        );
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const renderStructure = (data) => {
    return data.map((item, index) => {
      const isOpen = expandedItems[index];

      if (
        (item.name && item.name.includes(searchTerm)) ||
        (item.description && item.description.includes(searchTerm))
      ) {
        return (
          <div key={item._id} className="org-card">
            <div onClick={() => toggleExpand(index)} className="org-item-header">
              <h3 className="org-item-name">{item.name}</h3>
              <FontAwesomeIcon
                icon={isOpen ? faChevronDown : faChevronRight}
                className="toggle-icon"
              />
              <button className="edit-button">
                <FontAwesomeIcon icon={faEdit} /> تعديل
              </button>
            </div>
            <p className="org-item-description">{item.description}</p>
            {item.subUnits && item.subUnits.length > 0 && isOpen && (
              <div className="children">{renderStructure(item.subUnits)}</div>
            )}
          </div>
        );
      }
      return null;
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddItem = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found, please log in.");
        return;
      }

      const newItemData = {
        name: newItem.name,
        description: newItem.description,
        parentUnit: newItem.parentUnit,
      };
      const createdItem = await createAdministrativeUnit(newItemData, token);

      setStructureData((prev) => {
        const updatedData = [...prev];
        // You can adjust where the new item is added based on your structure
        updatedData.push({ ...createdItem, subUnits: [] });
        return updatedData;
      });
      setShowModal(false);
      setNewItem({ name: "", description: "", parentUnit: null });
    } catch (error) {
      alert(
        "Failed to add item: " +
          (error.response ? error.response.data.message : "Server error.")
      );
    }
  };

  const handleExportPDF = () => {
    alert("Export to PDF functionality to be implemented.");
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>القائمة</h2>
        <ul>
          <li>الرئيس</li>
          <li>إدارة الموارد البشرية</li>
          <li>إدارة الخدمات المشتركة</li>
          <li>تقارير</li>
        </ul>
      </aside>
      <main className="organizational-structure">
        <h1>الهيكل التنظيمي</h1>
        <div className="search-bar">
          <input 
            type="text"
            placeholder="ابحث عن عنصر..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <div className="action-buttons">
          <button className="add-item-button" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faPlus} /> إضافة عنصر
          </button>
          <button className="export-pdf-button" onClick={handleExportPDF}>
            <FontAwesomeIcon icon={faFilePdf} /> تصدير إلى PDF
          </button>
        </div>

        <div className="org-structure">{renderStructure(structureData)}</div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>إضافة عنصر جديد</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  اسم العنصر
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  الوصف
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="parentUnit" className="form-label">
                  وحدة الأب
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="parentUnit"
                  value={newItem.parentUnit || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, parentUnit: e.target.value })
                  }
                  placeholder="ID وحدة الأب"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              إلغاء
            </Button>
            <Button variant="primary" onClick={handleAddItem}>
              إضافة
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
};

export default OrganizationalStructurePage;
