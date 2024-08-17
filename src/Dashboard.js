import React, { useState } from 'react';
import './Dashboard.css'; 

const initialCategories = [
  {
    id: 'cspm-executive',
    name: 'CSPM Executive Dashboard',
    widgets: [
      { id: 'widget-1', name: 'cloud accounts', text: '1.connected 2.Not connected ' },
      { id: 'widget-2', name: 'cloud account risk assessment', text: 'Random text' }
    ]
  },
  {
    id: 'cspm-dashboard',
    name: 'CSPM Dashboard',
    widgets: [
      { id: 'widget-3', name: ' Top 5 Namespace Specific Alerts', text: 'no data available ' },
      { id: 'widget-3', name: 'Workload alert ', text: 'no data' }
    ]
  }, {
    id: 'cspm-registry',
    name: 'Registry Scan',
    widgets: [
      { id: 'widget-3', name: 'Image Risk Assessment', text: 'total vulnerability' },
      { id: 'widget-3', name: 'Image Security Assessment', text: 'total images' }
    ]
  }
];

const Dashboard = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetText, setNewWidgetText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  const addWidget = () => {
    const newWidget = {
      id: `widget-${Date.now()}`,
      name: newWidgetName,
      text: newWidgetText
    };

    setCategories(categories.map(category => {
      if (category.id === selectedCategory) {
        return {
          ...category,
          widgets: [...category.widgets, newWidget]
        };
      }
      return category;
    }));

    setNewWidgetName('');
    setNewWidgetText('');
  };

  const removeWidget = (categoryId, widgetId) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: category.widgets.filter(widget => widget.id !== widgetId)
        };
      }
      return category;
    }));
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Widget Name"
          value={newWidgetName}
          onChange={(e) => setNewWidgetName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Widget Text"
          value={newWidgetText}
          onChange={(e) => setNewWidgetText(e.target.value)}
        />
        <button onClick={addWidget}>+ Add Widget</button>
      </div>
      {categories.map(category => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {category.widgets.map(widget => (
              <div key={widget.id} style={{ border: '2px solid black ', padding: '10px', margin: '5px',borderRadius:'10px',backgroundColor:'white'}}>
                <h3>{widget.name}</h3>
                <p>{widget.text}</p>
                <button onClick={() => removeWidget(category.id, widget.id)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
