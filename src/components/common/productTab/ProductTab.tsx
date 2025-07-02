import React, { useState } from "react";
import "./ProductTab.css";
import { lojas } from "../../../features/productDetail/components";

interface Tab {
  id: string;
  label: string;
}

interface ProductTabsProps {
  specific_info: Record<string, any>;
  stores: Record<string, any>;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ specific_info, stores }) => {
  const [activeTab, setActiveTab] = useState<string>("lojas");
  const tabs: Tab[] = [
    { id: "lojas", label: "Lojas" },
    { id: "ficha", label: "Ficha Técnica" },
    { id: "avaliacoes", label: "Avaliações" },
  ];

  return (
    <div className="product-tabs-container">
      <div className="product-tabs-card">
        <div className="product-tabs-header">
          {tabs.map((tab: Tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`product-tabs-button ${
                activeTab === tab.id ? "active" : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="product-tabs-content">
          {activeTab === "lojas" && (
            <div className="store-list">
              {Object.entries(lojas).map(([key, value]) => (
                <div className="store-item" key={key}>
                  <span className="store-label">
                    {key
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                    :
                  </span>
                  <span className="store-value">{String(value)}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "ficha" && (
            <div className="specs-list">
              {Object.entries(specific_info).map(([key, value]) => (
                <div className="spec-item" key={key}>
                  <span className="spec-label">
                    {key
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                    :
                  </span>
                  <span className="spec-value">{String(value)}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "avaliacoes" && (
            <div className="reviews-placeholder">
              <h3 className="reviews-title">Avaliações em breve!</h3>
              <p className="reviews-message">
                Estamos trabalhando para trazer as melhores avaliações dos
                usuários.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
