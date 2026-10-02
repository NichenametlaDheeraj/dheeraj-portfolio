import React, { useState } from "react";
import { FaCode, FaDatabase, FaReact, FaCopy, FaCheck } from "react-icons/fa";
import "./CodeShowcase.css";

const codeSnippets = [
  {
    id: "django-api",
    title: "Django REST API Controller",
    icon: <FaCode />,
    language: "Python / Django",
    filename: "views.py",
    code: `from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import InventoryItem
from .serializers import InventorySerializer

class ProductCatalogView(APIView):
    """
    RESTful endpoint for querying product inventory 
    with dynamic stock filtering & database indexing.
    """
    def get(self, request):
        category = request.query_params.get('category', None)
        items = InventoryItem.objects.select_related('supplier').all()
        if category:
            items = items.filter(category__name__iexact=category)
        
        serializer = InventorySerializer(items, many=True)
        return Response({
            "status": "success",
            "count": items.count(),
            "data": serializer.data
        }, status=status.HTTP_200_OK)`
  },
  {
    id: "mysql-schema",
    title: "MySQL Relational Schema",
    icon: <FaDatabase />,
    language: "SQL / MySQL",
    filename: "schema.sql",
    code: `-- Relational Schema: Products & Inventory Log Transactions
CREATE TABLE suppliers (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    contact_email VARCHAR(150) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventory_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    stock_qty INT DEFAULT 0 CHECK (stock_qty >= 0),
    unit_price DECIMAL(10, 2) NOT NULL,
    supplier_id INT,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
    ON DELETE SET NULL
);`
  },
  {
    id: "react-integration",
    title: "React Custom Data Hook",
    icon: <FaReact />,
    language: "JavaScript / React",
    filename: "useFetchProjects.js",
    code: `import { useState, useEffect } from "react";

export function useFetchProjects(apiEndpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const res = await fetch(apiEndpoint);
        const json = await res.json();
        if (isMounted) setData(json.data);
      } catch (err) {
        if (isMounted) setError("Failed to load inventory API");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, [apiEndpoint]);

  return { data, loading, error };
}`
  }
];

export default function CodeShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentSnippet = codeSnippets[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="code-showcase-section">
      <div className="container">
        <div className="section-header-designer">
          <span className="section-number">ARCHITECTURE & CODE QUALITY</span>
          <h2 className="section-title">Clean Code & Database Engineering</h2>
          <p className="section-subtitle">
            An interactive preview of my coding standards, API architecture, and database relational design.
          </p>
        </div>

        <div className="code-editor-card card">
          {/* Editor Header / Tabs */}
          <div className="editor-top-bar">
            <div className="editor-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>

            <div className="editor-tabs">
              {codeSnippets.map((snippet, idx) => (
                <button
                  key={snippet.id}
                  className={`editor-tab-btn ${activeTab === idx ? "active" : ""}`}
                  onClick={() => setActiveTab(idx)}
                >
                  {snippet.icon}
                  <span>{snippet.filename}</span>
                </button>
              ))}
            </div>

            <button className="copy-code-btn" onClick={handleCopy} title="Copy Snippet">
              {copied ? <><FaCheck className="copied-icon" /> Copied!</> : <><FaCopy /> Copy Code</>}
            </button>
          </div>

          {/* Snippet Code Window */}
          <div className="editor-code-body">
            <div className="code-meta">
              <span className="code-lang-tag">{currentSnippet.language}</span>
              <span className="code-title-text">{currentSnippet.title}</span>
            </div>

            <pre className="code-pre">
              <code>{currentSnippet.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
