import React, { useState } from "react";
import "./ProductTab.css";
import type { OtherStores } from "../../../features/productDetail/components";
import { useNavigate } from "react-router-dom";

interface Tab {
  id: string;
  label: string;
}

interface ProductTabsProps {
  specific_info: Record<string, any>;
  stores: OtherStores[];
  description: string;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  specific_info,
  stores,
  description,
}) => {
  const [activeTab, setActiveTab] = useState<string>("lojas");
  const navigate = useNavigate();
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
              {stores.map((store) => (
                <button
                  key={store.ps_id}
                  className="store-button"
                  onClick={() => navigate(`/product/${store.ps_id}`)}
                  type="button"
                >
                  <span className="store-label">{store.store_name}:</span>
                  <span className="store-value">R$ {store.value}</span>
                </button>
              ))}
            </div>
          )}
          {activeTab === "ficha" && (
            <>
              <ul className="specs-list text-left indent-4 mb-4">
                {description.split("\n").map((line, idx) =>
                  line.trim() ? (
                    <li key={idx} className="spec-item spec-label">
                      {line}
                    </li>
                  ) : null
                )}
              </ul>

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
            </>
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
