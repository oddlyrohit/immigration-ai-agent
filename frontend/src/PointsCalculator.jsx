import React, { useState } from 'react';

const PointsCalculator = ({ onBack }) => {
  const [formData, setFormData] = useState({
    age: '',
    education: '',
    englishTest: '',
    workExperience: '',
    australianWork: '',
    pte: '',
    ielts: '',
    partnerPoints: '0',
    regionalStudy: 'no',
    naati: 'no',
    professionalYear: 'no',
    stateNomination: 'no'
  });

  const [results, setResults] = useState(null);

  const calculatePoints = () => {
    let points = 0;
    let breakdown = {};

    // Age points (18-44)
    const agePoints = {
      '18-24': 25,
      '25-32': 30,
      '33-39': 25,
      '40-44': 15,
      '45+': 0
    };
    const ageScore = agePoints[formData.age] || 0;
    points += ageScore;
    breakdown.age = ageScore;

    // Education points
    const educationPoints = {
      'doctorate': 20,
      'bachelor': 15,
      'diploma': 10,
      'trade': 10
    };
    const eduScore = educationPoints[formData.education] || 0;
    points += eduScore;
    breakdown.education = eduScore;

    // English proficiency
    let englishScore = 0;
    if (formData.englishTest === 'pte') {
      if (formData.pte === '79+') englishScore = 20;
      else if (formData.pte === '65-78') englishScore = 10;
      else if (formData.pte === '50-64') englishScore = 0;
    } else if (formData.englishTest === 'ielts') {
      if (formData.ielts === '8+') englishScore = 20;
      else if (formData.ielts === '7-7.5') englishScore = 10;
      else if (formData.ielts === '6-6.5') englishScore = 0;
    }
    points += englishScore;
    breakdown.english = englishScore;

    // Work experience (overseas)
    const workPoints = {
      '8+': 15,
      '5-7': 10,
      '3-4': 5,
      '<3': 0
    };
    const workScore = workPoints[formData.workExperience] || 0;
    points += workScore;
    breakdown.work = workScore;

    // Australian work experience
    const ausWorkPoints = {
      '8+': 20,
      '5-7': 15,
      '3-4': 10,
      '1-2': 5,
      '0': 0
    };
    const ausWorkScore = ausWorkPoints[formData.australianWork] || 0;
    points += ausWorkScore;
    breakdown.australianWork = ausWorkScore;

    // Partner skills
    const partnerScore = parseInt(formData.partnerPoints) || 0;
    points += partnerScore;
    breakdown.partner = partnerScore;

    // Other qualifications
    if (formData.regionalStudy === 'yes') {
      points += 5;
      breakdown.regional = 5;
    }
    if (formData.naati === 'yes') {
      points += 5;
      breakdown.naati = 5;
    }
    if (formData.professionalYear === 'yes') {
      points += 5;
      breakdown.professional = 5;
    }
    if (formData.stateNomination === 'yes') {
      points += 5;
      breakdown.state = 5;
    }

    setResults({
      total: points,
      breakdown,
      eligible: points >= 65,
      competitive: points >= 75
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setResults(null);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={onBack}>← Back</button>
        <div style={styles.headerTitle}>
          <h1 style={styles.title}>🇦🇺 Visa Points Calculator</h1>
          <p style={styles.subtitle}>Calculate your points for Australian Skilled Migration (Subclass 189)</p>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.formSection}>
          {/* Age */}
          <div style={styles.question}>
            <label style={styles.label}>Age</label>
            <select style={styles.select} value={formData.age} onChange={(e) => handleChange('age', e.target.value)}>
              <option value="">Select your age range</option>
              <option value="18-24">18-24 years (25 points)</option>
              <option value="25-32">25-32 years (30 points)</option>
              <option value="33-39">33-39 years (25 points)</option>
              <option value="40-44">40-44 years (15 points)</option>
              <option value="45+">45+ years (0 points)</option>
            </select>
          </div>

          {/* Education */}
          <div style={styles.question}>
            <label style={styles.label}>Highest Qualification</label>
            <select style={styles.select} value={formData.education} onChange={(e) => handleChange('education', e.target.value)}>
              <option value="">Select your education level</option>
              <option value="doctorate">Doctorate (20 points)</option>
              <option value="bachelor">Bachelor or higher (15 points)</option>
              <option value="diploma">Diploma/Trade (10 points)</option>
              <option value="trade">Trade qualification (10 points)</option>
            </select>
          </div>

          {/* English Test */}
          <div style={styles.question}>
            <label style={styles.label}>English Test Type</label>
            <select style={styles.select} value={formData.englishTest} onChange={(e) => handleChange('englishTest', e.target.value)}>
              <option value="">Select test type</option>
              <option value="pte">PTE Academic</option>
              <option value="ielts">IELTS</option>
            </select>
          </div>

          {formData.englishTest === 'pte' && (
            <div style={styles.question}>
              <label style={styles.label}>PTE Score (All sections)</label>
              <select style={styles.select} value={formData.pte} onChange={(e) => handleChange('pte', e.target.value)}>
                <option value="">Select your score</option>
                <option value="79+">79+ (Superior - 20 points)</option>
                <option value="65-78">65-78 (Proficient - 10 points)</option>
                <option value="50-64">50-64 (Competent - 0 points)</option>
              </select>
            </div>
          )}

          {formData.englishTest === 'ielts' && (
            <div style={styles.question}>
              <label style={styles.label}>IELTS Score (All sections)</label>
              <select style={styles.select} value={formData.ielts} onChange={(e) => handleChange('ielts', e.target.value)}>
                <option value="">Select your score</option>
                <option value="8+">8+ (Superior - 20 points)</option>
                <option value="7-7.5">7-7.5 (Proficient - 10 points)</option>
                <option value="6-6.5">6-6.5 (Competent - 0 points)</option>
              </select>
            </div>
          )}

          {/* Work Experience */}
          <div style={styles.question}>
            <label style={styles.label}>Overseas Work Experience (skilled employment)</label>
            <select style={styles.select} value={formData.workExperience} onChange={(e) => handleChange('workExperience', e.target.value)}>
              <option value="">Select years</option>
              <option value="8+">8+ years (15 points)</option>
              <option value="5-7">5-7 years (10 points)</option>
              <option value="3-4">3-4 years (5 points)</option>
              <option value="<3">Less than 3 years (0 points)</option>
            </select>
          </div>

          <div style={styles.question}>
            <label style={styles.label}>Australian Work Experience (skilled employment)</label>
            <select style={styles.select} value={formData.australianWork} onChange={(e) => handleChange('australianWork', e.target.value)}>
              <option value="">Select years</option>
              <option value="8+">8+ years (20 points)</option>
              <option value="5-7">5-7 years (15 points)</option>
              <option value="3-4">3-4 years (10 points)</option>
              <option value="1-2">1-2 years (5 points)</option>
              <option value="0">None (0 points)</option>
            </select>
          </div>

          {/* Partner Skills */}
          <div style={styles.question}>
            <label style={styles.label}>Partner Skills</label>
            <select style={styles.select} value={formData.partnerPoints} onChange={(e) => handleChange('partnerPoints', e.target.value)}>
              <option value="0">No partner or not applicable (0 points)</option>
              <option value="10">Partner with skills assessment (10 points)</option>
              <option value="5">Partner with competent English (5 points)</option>
            </select>
          </div>

          {/* Additional Points */}
          <div style={styles.question}>
            <label style={styles.label}>Regional Australian Study</label>
            <div style={styles.radioGroup}>
              <label style={styles.radio}>
                <input type="radio" checked={formData.regionalStudy === 'yes'} onChange={() => handleChange('regionalStudy', 'yes')} />
                Yes (5 points)
              </label>
              <label style={styles.radio}>
                <input type="radio" checked={formData.regionalStudy === 'no'} onChange={() => handleChange('regionalStudy', 'no')} />
                No
              </label>
            </div>
          </div>

          <div style={styles.question}>
            <label style={styles.label}>NAATI Credential</label>
            <div style={styles.radioGroup}>
              <label style={styles.radio}>
                <input type="radio" checked={formData.naati === 'yes'} onChange={() => handleChange('naati', 'yes')} />
                Yes (5 points)
              </label>
              <label style={styles.radio}>
                <input type="radio" checked={formData.naati === 'no'} onChange={() => handleChange('naati', 'no')} />
                No
              </label>
            </div>
          </div>

          <div style={styles.question}>
            <label style={styles.label}>Professional Year in Australia</label>
            <div style={styles.radioGroup}>
              <label style={styles.radio}>
                <input type="radio" checked={formData.professionalYear === 'yes'} onChange={() => handleChange('professionalYear', 'yes')} />
                Yes (5 points)
              </label>
              <label style={styles.radio}>
                <input type="radio" checked={formData.professionalYear === 'no'} onChange={() => handleChange('professionalYear', 'no')} />
                No
              </label>
            </div>
          </div>

          <button style={styles.calculateBtn} onClick={calculatePoints}>
            Calculate Points
          </button>
        </div>

        {/* Results */}
        {results && (
          <div style={styles.resultsSection}>
            <div style={{...styles.resultCard, ...(results.eligible ? styles.successCard : styles.warningCard)}}>
              <div style={styles.totalPoints}>{results.total}</div>
              <div style={styles.pointsLabel}>Total Points</div>
              
              {results.eligible ? (
                <div style={styles.statusMessage}>
                  ✅ You meet the minimum requirement (65 points)!
                  {results.competitive && (
                    <div style={styles.competitiveNote}>
                      🌟 Your score is competitive! (75+ points)
                    </div>
                  )}
                </div>
              ) : (
                <div style={styles.statusMessage}>
                  ⚠️ You need at least 65 points to be eligible
                  <div style={styles.shortfallNote}>
                    You need {65 - results.total} more points
                  </div>
                </div>
              )}
            </div>

            <div style={styles.breakdownCard}>
              <h3 style={styles.breakdownTitle}>Points Breakdown</h3>
              {Object.entries(results.breakdown).map(([category, points]) => (
                <div key={category} style={styles.breakdownItem}>
                  <span style={styles.categoryName}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </span>
                  <div style={styles.pointsBar}>
                    <div style={{...styles.pointsFill, width: `${(points / 30) * 100}%`}}></div>
                  </div>
                  <span style={styles.categoryPoints}>{points} pts</span>
                </div>
              ))}
            </div>

            <div style={styles.disclaimer}>
              ⚠️ This calculator provides an estimate only. For accurate assessment and visa applications, consult a registered MARA agent.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', background: '#f5f7fa' },
  header: { background: 'white', borderBottom: '2px solid #e5e5e5', padding: '20px', position: 'sticky', top: 0, zIndex: 100 },
  backBtn: { background: 'none', border: 'none', color: '#002664', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginBottom: '12px' },
  headerTitle: { maxWidth: '1200px', margin: '0 auto' },
  title: { fontSize: '32px', fontWeight: '700', color: '#002664', margin: '0 0 8px 0' },
  subtitle: { fontSize: '16px', color: '#666', margin: 0 },
  content: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' },
  formSection: { background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  question: { marginBottom: '24px' },
  label: { display: 'block', fontSize: '15px', fontWeight: '600', color: '#333', marginBottom: '8px' },
  select: { width: '100%', padding: '12px', border: '2px solid #e5e5e5', borderRadius: '8px', fontSize: '15px', cursor: 'pointer' },
  radioGroup: { display: 'flex', gap: '16px' },
  radio: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '15px' },
  calculateBtn: { width: '100%', background: '#002664', color: 'white', border: 'none', padding: '16px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' },
  resultsSection: { display: 'flex', flexDirection: 'column', gap: '24px' },
  resultCard: { background: 'white', padding: '32px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  successCard: { border: '3px solid #10b981' },
  warningCard: { border: '3px solid #f59e0b' },
  totalPoints: { fontSize: '72px', fontWeight: '700', color: '#002664' },
  pointsLabel: { fontSize: '18px', color: '#666', marginBottom: '16px' },
  statusMessage: { fontSize: '16px', fontWeight: '600', color: '#333' },
  competitiveNote: { marginTop: '8px', color: '#10b981', fontSize: '14px' },
  shortfallNote: { marginTop: '8px', color: '#f59e0b', fontSize: '14px' },
  breakdownCard: { background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  breakdownTitle: { fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#002664' },
  breakdownItem: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' },
  categoryName: { fontSize: '14px', fontWeight: '600', minWidth: '120px', color: '#333' },
  pointsBar: { flex: 1, height: '8px', background: '#e5e5e5', borderRadius: '4px', overflow: 'hidden' },
  pointsFill: { height: '100%', background: 'linear-gradient(90deg, #002664, #0056b3)', transition: 'width 0.3s' },
  categoryPoints: { fontSize: '14px', fontWeight: '700', color: '#002664', minWidth: '45px', textAlign: 'right' },
  disclaimer: { background: '#fff3cd', padding: '16px', borderRadius: '8px', fontSize: '13px', color: '#856404', textAlign: 'center' }
};

export default PointsCalculator;