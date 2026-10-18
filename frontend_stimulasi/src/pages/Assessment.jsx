import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';

export function Assessment({ onLogout, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentName, setSelectedStudentName] = useState('Leo Sterling');
  const [selectedGrade, setSelectedGrade] = useState('Kindergarten');
  const [toastMessage, setToastMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPredictionModal, setShowPredictionModal] = useState(false);

  // Form State
  const [spiritualRating, setSpiritualRating] = useState(3);
  const [spiritualNotes, setSpiritualNotes] = useState('');

  const [problemSolving, setProblemSolving] = useState('Competent');
  const [logicalReasoning, setLogicalReasoning] = useState(72);
  const [cognitiveNotes, setCognitiveNotes] = useState('');

  const [vocabRange, setVocabRange] = useState('HIGH');
  const [grammarAcc, setGrammarAcc] = useState('MID');
  const [articulation, setArticulation] = useState('HIGH');
  const [linguisticNotes, setLinguisticNotes] = useState('');

  const [interpersonalChecks, setInterpersonalChecks] = useState({
    sharesMaterials: false,
    showsLeadership: true,
    resolvesConflicts: false,
  });

  const [selfRegulation, setSelfRegulation] = useState(2);
  const [emotionalNotes, setEmotionalNotes] = useState('');

  const [grossMotor, setGrossMotor] = useState('Meeting Expectations');
  const [fineMotor, setFineMotor] = useState('Needs Support');
  const [kinestheticNotes, setKinestheticNotes] = useState('');

  const [uploadedFileName, setUploadedFileName] = useState(null);

  const [heightCm, setHeightCm] = useState('102');
  const [weightKg, setWeightKg] = useState('16.5');
  const [nutritionStars, setNutritionStars] = useState(3);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
      showToast(`Attached artwork photo: "${e.target.files[0].name}"`);
    }
  };

  const handleSaveDraft = () => {
    showToast('Draft assessment auto-saved successfully.');
  };

  const handleRunPrediction = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowPredictionModal(true);
    }, 1200);
  };

  return (
    <div className="bg-background text-on-surface font-body-md text-body-md min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-on-surface text-surface px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <span className="material-symbols-outlined text-secondary text-[22px]">
            check_circle
          </span>
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* 1. Sidebar Component (Separated) */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeMenu="Assessment"
        onSelectMenu={(menu) => {
          if (menu === 'Dashboard' && onNavigate) onNavigate('dashboard');
          else if (menu === 'Students' && onNavigate) onNavigate('students');
          else if (menu === 'Teachers' && onNavigate) onNavigate('teachers');
          else if (menu === 'Parents' && onNavigate) onNavigate('parents');
          else if (menu === 'Assessment' && onNavigate) onNavigate('assessment');
          else if (onNavigate) onNavigate(menu.toLowerCase());
        }}
        onNewAssessment={() => {}}
        onLogout={onLogout}
      />

      {/* 2. Main Content Canvas */}
      <main className="md:ml-64 min-h-screen relative flex flex-col">
        {/* TopNavBar Component (Separated) */}
        <Navbar
          onOpenSidebar={() => setMobileMenuOpen(true)}
          pageTitle="Assessment"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search student for assessment..."
          actionButton={
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('students')}
              className="bg-surface-container-lowest border border-outline-variant text-on-surface px-4 py-2 rounded-full font-label-md text-xs font-semibold flex items-center gap-2 hover:bg-surface-container-high transition-colors cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              <span className="hidden sm:inline">Back to Directory</span>
            </button>
          }
          onLogout={onLogout}
        />

        {/* 3. Assessment Form Area */}
        <div className="p-lg md:p-xl max-w-6xl w-full mx-auto flex-1">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-md">
            <div>
              <div
                onClick={() => onNavigate && onNavigate('students')}
                className="flex items-center gap-sm text-primary mb-xs cursor-pointer hover:underline w-fit text-xs font-semibold uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-[18px]">
                  arrow_back
                </span>
                <span>Back to Profile</span>
              </div>
              <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
                New Assessment for{' '}
                <span className="text-primary">{selectedStudentName}</span>
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-on-surface-variant font-body-md">
                <span>Academic Session: Spring 2024 • Term 2 Assessment</span>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <span className="text-outline font-medium">Student:</span>
                  <select
                    value={selectedStudentName}
                    onChange={(e) => setSelectedStudentName(e.target.value)}
                    className="bg-surface-container-low border border-outline-variant/60 rounded-lg px-2.5 py-1 text-xs text-on-surface font-semibold outline-none cursor-pointer"
                  >
                    <option>Leo Sterling</option>
                    <option>Mateo Fernandez</option>
                    <option>Alice Miller</option>
                    <option>Julian Parks</option>
                    <option>Amara Vance</option>
                    <option>Sophie Chen</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-sm">
              <span className="px-md py-xs bg-surface-container-high text-primary rounded-full font-label-md text-[11px] font-bold tracking-wider">
                DRAFT AUTO-SAVED 2M AGO
              </span>
            </div>
          </div>

          {/* Assessment Bento Grid Form */}
          <form
            className="grid grid-cols-12 gap-lg"
            id="assessmentForm"
            onSubmit={handleRunPrediction}
          >
            {/* 1. Spiritual Growth */}
            <section className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-md mb-lg">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">
                      auto_awesome
                    </span>
                  </div>
                  <h2 className="font-title-lg text-base font-bold text-on-surface">
                    Spiritual Growth
                  </h2>
                </div>

                <div className="space-y-md">
                  <div>
                    <label className="font-label-md text-xs font-semibold text-on-surface block mb-sm">
                      Empathy & Values Awareness: Level {spiritualRating}/5
                    </label>
                    <input
                      className="custom-slider w-full cursor-pointer accent-[#0059ba]"
                      max="5"
                      min="1"
                      type="range"
                      value={spiritualRating}
                      onChange={(e) => setSpiritualRating(Number(e.target.value))}
                    />
                    <div className="flex justify-between mt-1 font-label-md text-on-surface-variant text-[10px]">
                      <span>Developing</span>
                      <span>Competent</span>
                      <span>Exceeding</span>
                    </div>
                  </div>

                  <div>
                    <label className="font-label-md text-xs text-outline block mb-1">
                      Observation Notes
                    </label>
                    <textarea
                      value={spiritualNotes}
                      onChange={(e) => setSpiritualNotes(e.target.value)}
                      className="w-full rounded-lg border border-outline-variant/60 font-body-md text-xs text-on-surface p-3 placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-h-[90px]"
                      placeholder="Observation notes on child kindness, sharing, and peer empathy..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Cognitive Development */}
            <section className="col-span-12 md:col-span-6 lg:col-span-8 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-md mb-lg">
                <div className="w-10 h-10 rounded-lg bg-secondary-container/30 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <h2 className="font-title-lg text-base font-bold text-on-surface">
                  Cognitive Development
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                <div className="space-y-lg">
                  <div>
                    <label className="font-label-md text-xs font-semibold text-on-surface block mb-sm">
                      Problem Solving Efficiency
                    </label>
                    <div className="flex flex-wrap gap-sm">
                      {['Novice', 'Competent', 'Advanced'].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setProblemSolving(lvl)}
                          className={`px-md py-sm rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            problemSolving === lvl
                              ? 'bg-primary text-on-primary border border-primary shadow-xs'
                              : 'border border-outline-variant text-on-surface hover:bg-surface-container'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-sm">
                      <label className="font-label-md text-xs font-semibold text-on-surface">
                        Logical Reasoning Score
                      </label>
                      <span className="font-bold text-primary text-xs">
                        {logicalReasoning}/100
                      </span>
                    </div>
                    <input
                      className="custom-slider w-full cursor-pointer accent-[#0059ba]"
                      max="100"
                      min="1"
                      type="range"
                      value={logicalReasoning}
                      onChange={(e) => setLogicalReasoning(Number(e.target.value))}
                    />
                    <div className="flex justify-between mt-1 font-label-md text-on-surface-variant text-[10px]">
                      <span>Basic (0-40)</span>
                      <span>Target (50-80)</span>
                      <span>Advanced (&gt;80)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-label-md text-xs text-outline block mb-1">
                    Logical Leap Examples
                  </label>
                  <textarea
                    value={cognitiveNotes}
                    onChange={(e) => setCognitiveNotes(e.target.value)}
                    className="w-full rounded-lg border border-outline-variant/60 font-body-md text-xs text-on-surface p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-h-[120px]"
                    placeholder="Specific examples of puzzles solved, sequence matching, or spatial curiosity..."
                  ></textarea>
                </div>
              </div>
            </section>

            {/* 3. Linguistic Skills */}
            <section className="col-span-12 md:col-span-12 lg:col-span-4 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm">
              <div className="flex items-center gap-md mb-lg">
                <div className="w-10 h-10 rounded-lg bg-tertiary-fixed/40 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined">translate</span>
                </div>
                <h2 className="font-title-lg text-base font-bold text-on-surface">
                  Linguistic Skills
                </h2>
              </div>

              <div className="space-y-md text-xs">
                <div className="flex items-center justify-between p-sm border-b border-outline-variant/40">
                  <span className="font-body-md text-on-surface">Vocabulary Range</span>
                  <button
                    type="button"
                    onClick={() =>
                      setVocabRange((v) =>
                        v === 'HIGH' ? 'MID' : v === 'MID' ? 'LOW' : 'HIGH'
                      )
                    }
                    className="px-2.5 py-1 bg-secondary-fixed text-on-secondary-fixed rounded text-[10px] font-bold cursor-pointer hover:opacity-85"
                  >
                    {vocabRange}
                  </button>
                </div>

                <div className="flex items-center justify-between p-sm border-b border-outline-variant/40">
                  <span className="font-body-md text-on-surface">Grammar Accuracy</span>
                  <button
                    type="button"
                    onClick={() =>
                      setGrammarAcc((g) =>
                        g === 'MID' ? 'HIGH' : g === 'HIGH' ? 'LOW' : 'MID'
                      )
                    }
                    className="px-2.5 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded text-[10px] font-bold cursor-pointer hover:opacity-85"
                  >
                    {grammarAcc}
                  </button>
                </div>

                <div className="flex items-center justify-between p-sm">
                  <span className="font-body-md text-on-surface">Articulation</span>
                  <button
                    type="button"
                    onClick={() =>
                      setArticulation((a) =>
                        a === 'HIGH' ? 'MID' : a === 'MID' ? 'LOW' : 'HIGH'
                      )
                    }
                    className="px-2.5 py-1 bg-secondary-fixed text-on-secondary-fixed rounded text-[10px] font-bold cursor-pointer hover:opacity-85"
                  >
                    {articulation}
                  </button>
                </div>

                <textarea
                  value={linguisticNotes}
                  onChange={(e) => setLinguisticNotes(e.target.value)}
                  className="w-full rounded-lg border border-outline-variant/60 p-3 mt-md min-h-[80px] text-xs outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Linguistic development notes & storytelling ability..."
                ></textarea>
              </div>
            </section>

            {/* 4. Interpersonal */}
            <section className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-md mb-lg">
                  <div className="w-10 h-10 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">groups</span>
                  </div>
                  <h2 className="font-title-lg text-base font-bold text-on-surface">
                    Interpersonal
                  </h2>
                </div>

                <div className="space-y-lg text-xs">
                  <label className="flex items-center gap-md cursor-pointer">
                    <input
                      type="checkbox"
                      checked={interpersonalChecks.sharesMaterials}
                      onChange={(e) =>
                        setInterpersonalChecks({
                          ...interpersonalChecks,
                          sharesMaterials: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded text-primary focus:ring-primary border-outline-variant cursor-pointer"
                    />
                    <span className="font-body-md text-on-surface font-medium">
                      Shares materials willingly
                    </span>
                  </label>

                  <label className="flex items-center gap-md cursor-pointer">
                    <input
                      type="checkbox"
                      checked={interpersonalChecks.showsLeadership}
                      onChange={(e) =>
                        setInterpersonalChecks({
                          ...interpersonalChecks,
                          showsLeadership: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded text-primary focus:ring-primary border-outline-variant cursor-pointer"
                    />
                    <span className="font-body-md text-on-surface font-medium">
                      Shows leadership in play
                    </span>
                  </label>

                  <label className="flex items-center gap-md cursor-pointer">
                    <input
                      type="checkbox"
                      checked={interpersonalChecks.resolvesConflicts}
                      onChange={(e) =>
                        setInterpersonalChecks({
                          ...interpersonalChecks,
                          resolvesConflicts: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded text-primary focus:ring-primary border-outline-variant cursor-pointer"
                    />
                    <span className="font-body-md text-on-surface font-medium">
                      Resolves conflicts verbally
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-4 p-3 bg-surface-container-low rounded-lg text-[11px] text-on-surface-variant">
                Social quotient metric calculated across collaborative play hours.
              </div>
            </section>

            {/* 5. Intrapersonal */}
            <section className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-md mb-lg">
                  <div className="w-10 h-10 rounded-lg bg-error-container/40 flex items-center justify-center text-error">
                    <span className="material-symbols-outlined">
                      self_improvement
                    </span>
                  </div>
                  <h2 className="font-title-lg text-base font-bold text-on-surface">
                    Intrapersonal
                  </h2>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-sm">
                    <label className="font-label-md text-xs font-semibold text-on-surface block">
                      Self-Regulation Scale: {selfRegulation}/5
                    </label>
                  </div>
                  <div className="grid grid-cols-5 gap-xs cursor-pointer">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <div
                        key={lvl}
                        onClick={() => setSelfRegulation(lvl)}
                        className={`h-2.5 rounded-full transition-all ${
                          lvl <= selfRegulation
                            ? lvl <= 2
                              ? 'bg-error'
                              : lvl === 3
                              ? 'bg-tertiary-fixed-dim'
                              : 'bg-secondary'
                            : 'bg-surface-container-highest'
                        }`}
                        title={`Select level ${lvl}`}
                      ></div>
                    ))}
                  </div>

                  <p className="font-body-md mt-md italic text-on-surface-variant text-xs">
                    "Requires guidance when managing frustration."
                  </p>

                  <textarea
                    value={emotionalNotes}
                    onChange={(e) => setEmotionalNotes(e.target.value)}
                    className="w-full rounded-lg border border-outline-variant/60 mt-md p-3 text-xs outline-none focus:ring-2 focus:ring-primary/20 min-h-[80px]"
                    placeholder="Emotional regulation & resilience details..."
                  ></textarea>
                </div>
              </div>
            </section>

            {/* 6. Kinesthetic */}
            <section className="col-span-12 md:col-span-12 lg:col-span-5 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm">
              <div className="flex items-center gap-md mb-lg">
                <div className="w-10 h-10 rounded-lg bg-secondary-fixed-dim/40 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">
                    directions_run
                  </span>
                </div>
                <h2 className="font-title-lg text-base font-bold text-on-surface">
                  Kinesthetic
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-md text-xs">
                <div>
                  <label className="font-label-md text-xs font-semibold block mb-sm">
                    Gross Motor
                  </label>
                  <select
                    value={grossMotor}
                    onChange={(e) => setGrossMotor(e.target.value)}
                    className="w-full rounded-lg border border-outline-variant/60 p-2 text-xs focus:ring-primary outline-none cursor-pointer"
                  >
                    <option>Above Expectations</option>
                    <option>Meeting Expectations</option>
                    <option>Needs Support</option>
                  </select>
                </div>

                <div>
                  <label className="font-label-md text-xs font-semibold block mb-sm">
                    Fine Motor
                  </label>
                  <select
                    value={fineMotor}
                    onChange={(e) => setFineMotor(e.target.value)}
                    className="w-full rounded-lg border border-outline-variant/60 p-2 text-xs focus:ring-primary outline-none cursor-pointer"
                  >
                    <option>Above Expectations</option>
                    <option>Meeting Expectations</option>
                    <option>Needs Support</option>
                  </select>
                </div>
              </div>

              <textarea
                value={kinestheticNotes}
                onChange={(e) => setKinestheticNotes(e.target.value)}
                className="w-full rounded-lg border border-outline-variant/60 mt-md p-3 text-xs min-h-[80px] outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Physical coordination, grip, and balance observations..."
              ></textarea>
            </section>

            {/* 7. Visual Spatial */}
            <section className="col-span-12 md:col-span-6 lg:col-span-3 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-md mb-lg">
                  <div className="w-10 h-10 rounded-lg bg-primary-fixed/50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">grid_view</span>
                  </div>
                  <h2 className="font-title-lg text-base font-bold text-on-surface">
                    Visual Spatial
                  </h2>
                </div>

                <div className="flex flex-col gap-sm">
                  <label className="aspect-square bg-surface-container-low rounded-lg border-2 border-dashed border-outline-variant flex flex-col items-center justify-center p-md text-center cursor-pointer hover:bg-surface-container-high transition-colors relative overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <span className="material-symbols-outlined text-outline text-3xl">
                      upload_file
                    </span>
                    <span className="font-label-md text-[11px] text-outline mt-sm px-2">
                      {uploadedFileName ? (
                        <span className="text-primary font-bold">
                          ✓ {uploadedFileName}
                        </span>
                      ) : (
                        'Upload artwork or spatial puzzle photos'
                      )}
                    </span>
                  </label>
                </div>
              </div>
            </section>

            {/* 8. Physical Growth */}
            <section className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm">
              <div className="flex items-center gap-md mb-lg">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined">
                    monitor_weight
                  </span>
                </div>
                <h2 className="font-title-lg text-base font-bold text-on-surface">
                  Physical Growth
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-md text-xs">
                <div>
                  <label className="font-label-md text-xs font-semibold block mb-sm">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full rounded-lg border border-outline-variant/60 p-2 text-xs focus:ring-primary outline-none"
                    placeholder="102"
                  />
                </div>

                <div>
                  <label className="font-label-md text-xs font-semibold block mb-sm">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full rounded-lg border border-outline-variant/60 p-2 text-xs focus:ring-primary outline-none"
                    placeholder="16.5"
                  />
                </div>
              </div>

              <div className="mt-lg p-md bg-surface-container-low rounded-lg flex items-center justify-between">
                <span className="font-label-md text-xs font-semibold">
                  Nutritional Habits
                </span>
                <div className="flex gap-1 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      onClick={() => setNutritionStars(s)}
                      className={`material-symbols-outlined text-lg ${
                        s <= nutritionStars
                          ? 'text-primary fill-current'
                          : 'text-outline-variant'
                      }`}
                      style={{
                        fontVariationSettings: s <= nutritionStars ? "'FILL' 1" : "'FILL' 0",
                      }}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </form>

          {/* Spacer for sticky footer */}
          <div className="h-32"></div>
        </div>

        {/* Sticky Footer Actions */}
        <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-surface/90 backdrop-blur-md border-t border-outline-variant p-md z-40 shadow-lg">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-md">
            <div className="flex items-center gap-sm">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs border-2 border-surface">
                  CT
                </div>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] text-on-primary font-bold border-2 border-surface">
                  +1
                </div>
              </div>
              <span className="font-label-md text-xs text-on-surface-variant font-medium">
                Reviewing with 2 co-teachers (Ms. Thompson & Dr. Aris)
              </span>
            </div>

            <div className="flex items-center gap-md w-full md:w-auto">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex-1 md:flex-none px-xl py-md text-primary text-xs font-bold hover:bg-surface-container transition-colors rounded-xl cursor-pointer"
              >
                Save Draft
              </button>

              <button
                type="submit"
                form="assessmentForm"
                disabled={isSubmitting}
                className="flex-1 md:flex-none px-xl py-md bg-primary text-on-primary text-xs font-bold rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-md cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">
                      sync
                    </span>
                    <span>Analyzing Indicators...</span>
                  </>
                ) : (
                  <>
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      bolt
                    </span>
                    <span>Run Prediction</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL: C4.5 Decision Tree Prediction Results */}
      {showPredictionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/40">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">
                    auto_awesome
                  </span>
                </div>
                <div>
                  <h3 className="font-title-lg text-base font-bold text-on-surface">
                    Prediction & Classification Output
                  </h3>
                  <p className="text-[11px] text-outline font-mono">
                    Model: C4.5 Multi-Aspect Screening
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPredictionModal(false)}
                className="text-outline hover:text-on-surface text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Classification Banner */}
              <div className="p-4 rounded-xl bg-secondary-container/20 border border-secondary flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                    Predicted Outcome
                  </span>
                  <h4 className="font-title-lg text-lg font-bold text-on-secondary-container mt-0.5">
                    Meeting Expectations (Sesuai)
                  </h4>
                  <p className="text-[11px] text-on-surface-variant mt-1">
                    Student shows healthy balance between logical and social integration milestones.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-secondary">
                    94.8%
                  </span>
                  <span className="text-[10px] text-outline block">
                    Confidence
                  </span>
                </div>
              </div>

              {/* Aspect summary scores */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2 bg-surface-container-low rounded-lg">
                  <span className="text-[10px] text-outline block">Spiritual</span>
                  <span className="font-bold text-primary text-sm">{spiritualRating}/5</span>
                </div>
                <div className="p-2 bg-surface-container-low rounded-lg">
                  <span className="text-[10px] text-outline block">Cognitive</span>
                  <span className="font-bold text-primary text-sm">{logicalReasoning}%</span>
                </div>
                <div className="p-2 bg-surface-container-low rounded-lg">
                  <span className="text-[10px] text-outline block">Kinesthetic</span>
                  <span className="font-bold text-primary text-sm">Meeting</span>
                </div>
                <div className="p-2 bg-surface-container-low rounded-lg">
                  <span className="text-[10px] text-outline block">Growth</span>
                  <span className="font-bold text-primary text-sm">{heightCm} cm</span>
                </div>
              </div>

              {/* Recommendation snippet */}
              <div className="p-3 bg-surface-container-low rounded-xl">
                <span className="font-bold text-xs text-primary block mb-1">
                  Generated Individualized Strategy:
                </span>
                <p className="text-on-surface-variant leading-relaxed">
                  Reinforce fine motor grip coordination with clay molding and safety scissors exercises while maintaining active cognitive puzzle sequences.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/40 mt-5">
              <button
                type="button"
                onClick={() => setShowPredictionModal(false)}
                className="px-4 py-2 border border-outline-variant text-on-surface text-xs font-semibold rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPredictionModal(false);
                  showToast('Assessment successfully saved to student record!');
                  if (onNavigate) onNavigate('dashboard');
                }}
                className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
              >
                Confirm & Sync to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assessment;
