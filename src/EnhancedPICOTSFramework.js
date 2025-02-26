import React, { useState } from 'react';

const EnhancedPICOTSFramework = () => {
  const [framework, setFramework] = useState({
    population: '',
    intervention: '',
    comparison: '',
    outcomes: '',
    timing: '',
    setting: ''
  });

  const [evaluationQuality, setEvaluationQuality] = useState({
    internalValidity: 'not_assessed',
    externalValidity: 'not_assessed',
    biasRisk: 'not_assessed',
    evidenceGrading: 'not_assessed'
  });

  const [pitfalls, setPitfalls] = useState([]);
  const [activeSection, setActiveSection] = useState('population');
  const [activeTab, setActiveTab] = useState('picots');
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Quick reference tooltips for each section
  const tooltips = {
    population: "Define who is being studied (e.g., adults with type 2 diabetes, children ages 5-12 with asthma)",
    intervention: "Specify the treatment, approach, or exposure (e.g., cognitive behavioral therapy, new medication)",
    comparison: "Identify the control or alternative (e.g., placebo, standard of care, no treatment)",
    outcomes: "List measurable results (e.g., reduction in symptoms, mortality rate, quality of life scores)",
    timing: "Specify timeframe (e.g., 6-month follow-up, measurements at baseline and 12 weeks)",
    setting: "Describe where the study takes place (e.g., urban hospitals, rural clinics, home-based)"
  };

  // Examples for each section
  const examples = {
    population: "Adults aged 40-75 with diagnosed hypertension (systolic BP ≥140 mmHg) without history of cardiovascular disease",
    intervention: "Mindfulness-based stress reduction program consisting of 8 weekly 2-hour group sessions plus daily 30-minute home practice",
    comparison: "Wait-list control group receiving standard hypertension medication management only",
    outcomes: "Primary: Change in systolic blood pressure at 12 weeks. Secondary: Self-reported stress levels measured by PSS-10 scale",
    timing: "Assessments at baseline, 8 weeks (post-intervention), and 6-month follow-up",
    setting: "Three urban primary care clinics serving diverse socioeconomic populations"
  };

  // Evaluation quality section
  const evalQualityOptions = {
    internalValidity: [
      { value: 'high', label: 'High - Robust methodology with minimal bias' },
      { value: 'moderate', label: 'Moderate - Generally sound with some limitations' },
      { value: 'low', label: 'Low - Significant methodological concerns' },
      { value: 'not_assessed', label: 'Not Assessed' }
    ],
    externalValidity: [
      { value: 'high', label: 'High - Results widely generalizable' },
      { value: 'moderate', label: 'Moderate - Generalizable to similar populations' },
      { value: 'low', label: 'Low - Limited generalizability' },
      { value: 'not_assessed', label: 'Not Assessed' }
    ],
    biasRisk: [
      { value: 'low', label: 'Low - Minimal bias concerns' },
      { value: 'moderate', label: 'Moderate - Some bias possible but unlikely to alter results' },
      { value: 'high', label: 'High - Significant bias concerns that may impact findings' },
      { value: 'not_assessed', label: 'Not Assessed' }
    ],
    evidenceGrading: [
      { value: 'a', label: 'Grade A - High quality evidence' },
      { value: 'b', label: 'Grade B - Moderate quality evidence' },
      { value: 'c', label: 'Grade C - Low quality evidence' },
      { value: 'd', label: 'Grade D - Very low quality evidence' },
      { value: 'not_assessed', label: 'Not Assessed' }
    ]
  };
  
  // Threats to validity in assessment
  const threatsToValidity = {
    selection: "Selection bias occurs when the selection process creates systematic differences between comparison groups.",
    performance: "Performance bias results from systematic differences in care provided apart from the intervention.",
    attrition: "Attrition bias occurs when outcome data is incomplete or there are systematic differences in withdrawals.",
    detection: "Detection bias comes from systematic differences in outcome assessment.",
    reporting: "Reporting bias results from selective reporting of outcomes.",
    confounding: "Confounding occurs when an extraneous variable correlates with both the intervention and outcome."
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFramework(prev => ({
      ...prev,
      [name]: value
    }));
    if (formSubmitted) {
      analyzePICOTS();
    }
  };

  const handleEvalQualityChange = (e) => {
    const { name, value } = e.target;
    setEvaluationQuality(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const analyzePICOTS = () => {
    setFormSubmitted(true);
    const newPitfalls = [];

    // Population analysis
    if (!framework.population) {
      newPitfalls.push({
        category: 'Population',
        issue: 'No population defined',
        severity: 'Critical',
        recommendation: 'Clearly specify inclusion and exclusion criteria'
      });
    } else {
      const popKeywords = framework.population.toLowerCase().split(/\s+/);
      if (popKeywords.length < 3) {
        newPitfalls.push({
          category: 'Population',
          issue: 'Vague population description',
          severity: 'Moderate',
          recommendation: 'Provide more detailed demographic and clinical characteristics'
        });
      }
    }

    // Intervention analysis
    if (!framework.intervention) {
      newPitfalls.push({
        category: 'Intervention',
        issue: 'No intervention specified',
        severity: 'Critical',
        recommendation: 'Clearly define the specific intervention or exposure'
      });
    } else {
      const interventionKeywords = framework.intervention.toLowerCase().split(/\s+/);
      if (interventionKeywords.length < 2) {
        newPitfalls.push({
          category: 'Intervention',
          issue: 'Insufficient intervention details',
          severity: 'Moderate',
          recommendation: 'Provide more specific details about the intervention protocol'
        });
      }
    }

    // Comparison analysis
    if (!framework.comparison) {
      newPitfalls.push({
        category: 'Comparison',
        issue: 'No comparison group defined',
        severity: 'Critical',
        recommendation: 'Specify the control or alternative intervention group'
      });
    }

    // Outcomes analysis
    if (!framework.outcomes) {
      newPitfalls.push({
        category: 'Outcomes',
        issue: 'No outcomes specified',
        severity: 'Critical',
        recommendation: 'Clearly define primary and secondary outcome measures'
      });
    } else {
      const outcomeKeywords = framework.outcomes.toLowerCase().split(/\s+/);
      if (outcomeKeywords.length < 2) {
        newPitfalls.push({
          category: 'Outcomes',
          issue: 'Vague outcome description',
          severity: 'Moderate',
          recommendation: 'Provide measurable and specific outcome criteria'
        });
      }
    }

    // Timing analysis
    if (!framework.timing) {
      newPitfalls.push({
        category: 'Timing',
        issue: 'No study duration specified',
        severity: 'Moderate',
        recommendation: 'Define the specific timeframe for data collection and follow-up'
      });
    }

    // Setting analysis
    if (!framework.setting) {
      newPitfalls.push({
        category: 'Setting',
        issue: 'No research setting described',
        severity: 'Moderate',
        recommendation: 'Specify the context and location of the research'
      });
    }

    setPitfalls(newPitfalls);
  };

  const getCompletionStatus = () => {
    const total = Object.keys(framework).length;
    const filled = Object.values(framework).filter(v => v.trim().length > 0).length;
    return Math.round((filled / total) * 100);
  };

  const getStrengthScore = () => {
    if (pitfalls.length === 0 && !formSubmitted) return null;
    
    const criticalCount = pitfalls.filter(p => p.severity === 'Critical').length;
    const moderateCount = pitfalls.filter(p => p.severity === 'Moderate').length;
    
    // Calculate score (0-100 scale)
    const maxIssues = 7; // Max possible pitfalls
    const criticalWeight = 15;
    const moderateWeight = 5;
    
    const deductions = (criticalCount * criticalWeight) + (moderateCount * moderateWeight);
    return Math.max(0, 100 - deductions);
  };

  const getEvaluationQualityScore = () => {
    if (!formSubmitted) return null;
    
    const scores = {
      internalValidity: { high: 25, moderate: 15, low: 5, not_assessed: 0 },
      externalValidity: { high: 25, moderate: 15, low: 5, not_assessed: 0 },
      biasRisk: { low: 25, moderate: 15, high: 5, not_assessed: 0 },
      evidenceGrading: { a: 25, b: 15, c: 5, d: 0, not_assessed: 0 }
    };
    
    let total = 0;
    
    total += scores.internalValidity[evaluationQuality.internalValidity] || 0;
    total += scores.externalValidity[evaluationQuality.externalValidity] || 0;
    total += scores.biasRisk[evaluationQuality.biasRisk] || 0;
    total += scores.evidenceGrading[evaluationQuality.evidenceGrading] || 0;
    
    return total;
  };

  const strengthScore = getStrengthScore();
  const evaluationScore = getEvaluationQualityScore();
  const completionPercentage = getCompletionStatus();

  return (
    <div className="picots-framework">
      <h2>Enhanced PICOTS Framework Analysis</h2>
      
      <div className="tab-switcher">
        <button 
          className={`tab-btn ${activeTab === 'picots' ? 'active' : ''}`}
          onClick={() => setActiveTab('picots')}
        >
          PICOTS Framework
        </button>
        <button 
          className={`tab-btn ${activeTab === 'evaluation' ? 'active' : ''}`}
          onClick={() => setActiveTab('evaluation')}
        >
          Evaluation Quality
        </button>
      </div>
      
      {activeTab === 'picots' ? (
        <div>
          <div className="framework-completion">
            <div className="completion-text">
              <span>Framework Completion</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${completionPercentage}%`}}
              ></div>
            </div>
          </div>
          
          <div className="picots-content">
            <div className="picots-sidebar">
              {Object.keys(framework).map((section) => (
                <div 
                  key={section}
                  className={`sidebar-item ${activeSection === section ? 'active' : ''} ${framework[section] ? 'completed' : ''}`}
                  onClick={() => handleSectionClick(section)}
                >
                  <div className="sidebar-icon">
                    {section === 'population' && '👥'}
                    {section === 'intervention' && '💊'}
                    {section === 'comparison' && '⚖️'}
                    {section === 'outcomes' && '📊'}
                    {section === 'timing' && '⏱️'}
                    {section === 'setting' && '🏥'}
                  </div>
                  <div className="sidebar-text">
                    <span className="section-title">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                    {framework[section] ? (
                      <span className="completion-indicator">Completed</span>
                    ) : (
                      <span className="completion-indicator incomplete">Not defined</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="picots-form">
              <div className="form-header">
                <h3>
                  {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                  <span className="tooltip-icon" title={tooltips[activeSection]}>ℹ️</span>
                </h3>
              </div>
              
              <div className="active-section-content">
                <label htmlFor={activeSection}>Description</label>
                <textarea
                  id={activeSection}
                  name={activeSection}
                  value={framework[activeSection]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${activeSection} details...`}
                  rows={6}
                />
                
                <div className="textarea-helper">
                  <div className="helper-text">
                    <strong>Tip:</strong> {tooltips[activeSection]}
                  </div>
                  <div className="example-section">
                    <div className="example-header">Example:</div>
                    <div className="example-content">{examples[activeSection]}</div>
                    <button 
                      className="use-example-btn"
                      onClick={() => {
                        setFramework(prev => ({
                          ...prev,
                          [activeSection]: examples[activeSection]
                        }));
                      }}
                    >
                      Use Example
                    </button>
                  </div>
                </div>
                
                <div className="section-nav">
                  {activeSection !== 'population' && (
                    <button 
                      className="nav-btn prev"
                      onClick={() => {
                        const sections = Object.keys(framework);
                        const currentIndex = sections.indexOf(activeSection);
                        setActiveSection(sections[currentIndex - 1]);
                      }}
                    >
                      ← Previous
                    </button>
                  )}
                  
                  {activeSection !== 'setting' && (
                    <button 
                      className="nav-btn next"
                      onClick={() => {
                        const sections = Object.keys(framework);
                        const currentIndex = sections.indexOf(activeSection);
                        setActiveSection(sections[currentIndex + 1]);
                      }}
                    >
                      Next →
                    </button>
                  )}
                  
                  <button
                    onClick={analyzePICOTS}
                    className="analyze-btn"
                  >
                    Analyze Framework
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="evaluation-quality-section">
          <h3>Evaluation Quality Assessment</h3>
          <p className="eval-description">
            Assess the methodological quality of the study or evidence being evaluated using the criteria below.
            This assessment helps determine the strength and reliability of the findings.
          </p>
          
          <div className="eval-form">
            <div className="eval-form-row">
              <div className="eval-label">
                <label htmlFor="internalValidity">Internal Validity:</label>
                <div className="eval-tooltip">
                  The extent to which the design and conduct of the study eliminate the possibility of bias
                </div>
              </div>
              <select 
                id="internalValidity" 
                name="internalValidity"
                value={evaluationQuality.internalValidity}
                onChange={handleEvalQualityChange}
                className="eval-select"
              >
                {evalQualityOptions.internalValidity.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="eval-form-row">
              <div className="eval-label">
                <label htmlFor="externalValidity">External Validity:</label>
                <div className="eval-tooltip">
                  The extent to which the results can be generalized to other settings or populations
                </div>
              </div>
              <select 
                id="externalValidity" 
                name="externalValidity"
                value={evaluationQuality.externalValidity}
                onChange={handleEvalQualityChange}
                className="eval-select"
              >
                {evalQualityOptions.externalValidity.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="eval-form-row">
              <div className="eval-label">
                <label htmlFor="biasRisk">Risk of Bias:</label>
                <div className="eval-tooltip">
                  The likelihood that systematic errors may have influenced the results
                </div>
              </div>
              <select 
                id="biasRisk" 
                name="biasRisk"
                value={evaluationQuality.biasRisk}
                onChange={handleEvalQualityChange}
                className="eval-select"
              >
                {evalQualityOptions.biasRisk.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="eval-form-row">
              <div className="eval-label">
                <label htmlFor="evidenceGrading">Evidence Grade:</label>
                <div className="eval-tooltip">
                  Overall assessment of evidence quality based on study design, implementation, and relevance
                </div>
              </div>
              <select 
                id="evidenceGrading" 
                name="evidenceGrading"
                value={evaluationQuality.evidenceGrading}
                onChange={handleEvalQualityChange}
                className="eval-select"
              >
                {evalQualityOptions.evidenceGrading.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={() => setFormSubmitted(true)}
              className="analyze-btn"
            >
              Evaluate Quality
            </button>
          </div>
          
          {formSubmitted && (
            <div className="threats-to-validity">
              <h4>Common Threats to Validity</h4>
              <div className="threats-grid">
                {Object.entries(threatsToValidity).map(([key, description]) => (
                  <div key={key} className="threat-card">
                    <h5>{key.charAt(0).toUpperCase() + key.slice(1)} Bias</h5>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {formSubmitted && evaluationScore !== null && (
            <div className="evaluation-results">
              <h4>Evidence Quality Score</h4>
              <div className="eval-score-container">
                <div className={`eval-score ${
                  evaluationScore >= 75 ? 'high' : 
                  evaluationScore >= 50 ? 'medium' : 'low'
                }`}>
                  {evaluationScore}/100
                </div>
                <div className="eval-rating">
                  {evaluationScore >= 75 ? 'High Quality Evidence' : 
                   evaluationScore >= 50 ? 'Moderate Quality Evidence' : 
                   evaluationScore >= 25 ? 'Low Quality Evidence' : 'Very Low Quality Evidence'}
                </div>
              </div>
              
              <div className="eval-recommendations">
                <h5>Recommendations Based on Evidence Quality:</h5>
                <ul>
                  {evaluationScore >= 75 && (
                    <li>Strong evidence - suitable for clinical decision-making and policy development</li>
                  )}
                  {evaluationScore >= 50 && evaluationScore < 75 && (
                    <li>Moderate evidence - can inform decisions but consider limitations</li>
                  )}
                  {evaluationScore >= 25 && evaluationScore < 50 && (
                    <li>Low evidence - use with caution, consider as preliminary findings only</li>
                  )}
                  {evaluationScore < 25 && (
                    <li>Very low evidence - insufficient for decision-making, more research needed</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
      
      {formSubmitted && activeTab === 'picots' && (
        <div className="analysis-results">
          <div className="results-header">
            <h3>Framework Analysis Results</h3>
            {strengthScore !== null && (
              <div className="strength-meter">
                <span>Framework Strength:</span>
                <div className="strength-bar-container">
                  <div 
                    className={`strength-bar ${
                      strengthScore >= 80 ? 'high' : 
                      strengthScore >= 50 ? 'medium' : 'low'
                    }`}
                    style={{width: `${strengthScore}%`}}
                  ></div>
                </div>
                <span className="strength-score">{strengthScore}/100</span>
              </div>
            )}
          </div>
          
          {pitfalls.length > 0 ? (
            <div className="pitfalls-section">
              <h4>Identified Issues</h4>
              
              <div className="pitfalls-list">
                {pitfalls.map((pitfall, index) => (
                  <div 
                    key={index} 
                    className={`pitfall-card ${pitfall.severity.toLowerCase()}`}
                  >
                    <div className="pitfall-header">
                      <h5>{pitfall.category}</h5>
                      <span className={`severity-badge ${pitfall.severity.toLowerCase()}`}>
                        {pitfall.severity === 'Critical' ? '🚫 Critical' : '⚠️ Moderate'}
                      </span>
                    </div>
                    <p className="pitfall-issue">{pitfall.issue}</p>
                    <p className="pitfall-recommendation">
                      <strong>Recommendation:</strong> {pitfall.recommendation}
                    </p>
                    <button 
                      className="fix-issue-btn"
                      onClick={() => {
                        // Set active section to the one that needs fixing
                        setActiveSection(pitfall.category.toLowerCase());
                      }}
                    >
                      Fix Issue
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h4>Your framework looks good!</h4>
              <p>No significant methodological issues were identified. Your PICOTS framework is well-defined.</p>
            </div>
          )}
          
          <div className="framework-summary">
            <h4>Framework Summary</h4>
            <div className="summary-grid">
              {Object.entries(framework).map(([key, value]) => (
                <div key={key} className="summary-item">
                  <h5>{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
                  <p>{value || 'Not defined'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedPICOTSFramework;