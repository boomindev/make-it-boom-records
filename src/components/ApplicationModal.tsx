import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, CheckCircle2, Upload, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { ApplicationFormData } from '../types';

interface ApplicationModalProps {
  isOpen: boolean;
  initialType?: 'artist_join' | 'demo_submission';
  initialPlan?: string;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  initialType = 'artist_join',
  initialPlan = '',
  onClose,
}) => {
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const [formType, setFormType] = useState<'artist_join' | 'demo_submission'>(initialType);
  const [formData, setFormData] = useState<ApplicationFormData>({
    type: initialType,
    fullName: '',
    artistName: '',
    email: '',
    phone: '',
    country: '',
    genre: '',
    selectedPlan: initialPlan || 'PROFESSIONAL',
    spotifyLink: '',
    instagramLink: '',
    youtubeLink: '',
    message: '',
    demoFile: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Synchronize initial prop changes
  useEffect(() => {
    setFormType(initialType);
    setFormData((prev) => ({
      ...prev,
      type: initialType,
      selectedPlan: initialPlan || (initialType === 'artist_join' ? 'PROFESSIONAL' : 'STARTER'),
    }));
    setSubmitted(false);
    setErrorMsg('');
  }, [initialType, initialPlan, isOpen]);

  // GSAP animation when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const ctx = gsap.context(() => {
        gsap.fromTo(
          modalOverlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
        gsap.fromTo(
          modalContentRef.current,
          { scale: 0.9, y: 30, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
        );
      });
      return () => ctx.revert();
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, demoFile: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.artistName || !formData.email) {
      setErrorMsg('Please fill in all required fields (Name, Artist Name, Email).');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('submission_type', formType === 'demo_submission' ? 'Demo Submission' : 'Artist Application');
      payload.append('full_name', formData.fullName);
      payload.append('artist_name', formData.artistName);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('country', formData.country);
      payload.append('genre', formData.genre);
      payload.append('selected_plan', formData.selectedPlan);
      payload.append('spotify_link', formData.spotifyLink);
      payload.append('instagram_link', formData.instagramLink);
      payload.append('youtube_link', formData.youtubeLink);
      payload.append('message', formData.message);

      if (formData.demoFile) {
        payload.append('demo_file', formData.demoFile);
      }

      const response = await fetch('https://formspree.io/f/xgawkqnr', {
        method: 'POST',
        body: payload,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => ({}));
        if (data && data.errors && data.errors.length > 0) {
          setErrorMsg(data.errors.map((err: any) => err.message).join(', '));
        } else {
          setErrorMsg('Error submitting application. Please try again.');
        }
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={modalOverlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        ref={modalContentRef}
        className="relative w-full max-w-3xl bg-[#131313] border border-white/20 rounded-[4px] shadow-2xl p-6 sm:p-10 my-8 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#8e9192] hover:text-white p-2 border border-white/10 hover:border-white/40 rounded-[2px] transition-all duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* SUCCESS STATE */
          <div className="py-12 text-center flex flex-col items-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-white/10 border border-white/30 text-white flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-headline font-black text-3xl sm:text-4xl text-white tracking-tight uppercase mb-4">
              APPLICATION RECEIVED
            </h3>
            <p className="text-base text-[#c4c7c8] font-light max-w-md mb-8 leading-relaxed">
              Thank you for your interest in Make It Boom Records. Our A&R and management team will review your submission and contact you via email or WhatsApp soon.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="font-headline font-bold text-xs tracking-widest uppercase bg-white text-black px-8 py-4 rounded-[4px] hover:bg-neutral-200 transition-colors"
            >
              BACK TO WEBSITE
            </button>
          </div>
        ) : (
          /* FORM STATE */
          <div>
            {/* Header / Mode Selector */}
            <div className="mb-8 pr-8">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#8e9192] uppercase">
                  OFFICIAL RECORD LABEL APPLICATION
                </span>
              </div>
              <h2 className="font-headline font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
                {formType === 'demo_submission' ? 'SUBMIT YOUR DEMO' : 'JOIN MAKE IT BOOM'}
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="grid grid-cols-2 gap-2 mb-8 bg-[#181818] p-1 rounded-[4px] border border-white/10">
              <button
                type="button"
                onClick={() => setFormType('artist_join')}
                className={`py-2.5 text-xs font-bold tracking-wider uppercase rounded-[2px] transition-all ${
                  formType === 'artist_join'
                    ? 'bg-white text-black shadow-md'
                    : 'text-[#8e9192] hover:text-white'
                }`}
              >
                ARTIST APPLICATION
              </button>
              <button
                type="button"
                onClick={() => setFormType('demo_submission')}
                className={`py-2.5 text-xs font-bold tracking-wider uppercase rounded-[2px] transition-all ${
                  formType === 'demo_submission'
                    ? 'bg-white text-black shadow-md'
                    : 'text-[#8e9192] hover:text-white'
                }`}
              >
                DEMO SUBMISSION
              </button>
            </div>

            {errorMsg && (
              <div className="mb-6 p-3 bg-red-900/30 border border-red-500/50 text-red-200 text-xs rounded">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-[#8e9192] tracking-widest uppercase mb-2">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-[#181818] border border-white/15 focus:border-white rounded-[4px] px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#8e9192] tracking-widest uppercase mb-2">
                    ARTIST / STAGE NAME *
                  </label>
                  <input
                    type="text"
                    name="artistName"
                    required
                    placeholder="e.g. VEXEN"
                    value={formData.artistName}
                    onChange={handleChange}
                    className="w-full bg-[#181818] border border-white/15 focus:border-white rounded-[4px] px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-[#8e9192] tracking-widest uppercase mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="artist@recordlabel.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#181818] border border-white/15 focus:border-white rounded-[4px] px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#8e9192] tracking-widest uppercase mb-2">
                    PHONE / WHATSAPP
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#181818] border border-white/15 focus:border-white rounded-[4px] px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-[#8e9192] tracking-widest uppercase mb-2">
                    COUNTRY
                  </label>
                  <input
                    type="text"
                    name="country"
                    placeholder="United States, Spain..."
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-[#181818] border border-white/15 focus:border-white rounded-[4px] px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#8e9192] tracking-widest uppercase mb-2">
                    MUSIC GENRE
                  </label>
                  <input
                    type="text"
                    name="genre"
                    placeholder="Electronic, Hip-Hop, House..."
                    value={formData.genre}
                    onChange={handleChange}
                    className="w-full bg-[#181818] border border-white/15 focus:border-white rounded-[4px] px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#8e9192] tracking-widest uppercase mb-2">
                    SELECT PLAN
                  </label>
                  <select
                    name="selectedPlan"
                    value={formData.selectedPlan}
                    onChange={handleChange}
                    className="w-full bg-[#181818] border border-white/15 focus:border-white rounded-[4px] px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="STARTER">STARTER ($29/mo)</option>
                    <option value="PROFESSIONAL">PROFESSIONAL ($79/mo)</option>
                    <option value="ELITE">ELITE ($199/mo)</option>
                    <option value="PREMIUM">PREMIUM ($499/mo)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-[#8e9192] tracking-widest uppercase mb-2">
                    SPOTIFY / MUSIC LINK
                  </label>
                  <input
                    type="url"
                    name="spotifyLink"
                    placeholder="https://open.spotify.com/artist/..."
                    value={formData.spotifyLink}
                    onChange={handleChange}
                    className="w-full bg-[#181818] border border-white/15 focus:border-white rounded-[4px] px-4 py-3 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#8e9192] tracking-widest uppercase mb-2">
                    INSTAGRAM LINK
                  </label>
                  <input
                    type="url"
                    name="instagramLink"
                    placeholder="https://instagram.com/..."
                    value={formData.instagramLink}
                    onChange={handleChange}
                    className="w-full bg-[#181818] border border-white/15 focus:border-white rounded-[4px] px-4 py-3 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#8e9192] tracking-widest uppercase mb-2">
                    YOUTUBE / OTHER LINK
                  </label>
                  <input
                    type="url"
                    name="youtubeLink"
                    placeholder="https://youtube.com/..."
                    value={formData.youtubeLink}
                    onChange={handleChange}
                    className="w-full bg-[#181818] border border-white/15 focus:border-white rounded-[4px] px-4 py-3 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Upload Demo Option */}
              <div>
                <label className="block text-[10px] font-bold text-[#8e9192] tracking-widest uppercase mb-2">
                  UPLOAD UNRELEASED DEMO (MP3, WAV, ZIP)
                </label>
                <div className="relative border border-dashed border-white/20 rounded-[4px] p-4 text-center hover:border-white/50 transition-colors bg-[#181818]/50">
                  <input
                    type="file"
                    accept=".mp3,.wav,.flac,.zip"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex items-center justify-center gap-2 text-xs text-[#c4c7c8]">
                    <Upload className="w-4 h-4 text-white" />
                    <span>
                      {formData.demoFile
                        ? formData.demoFile.name
                        : 'Drag & drop demo audio file or click to browse'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] font-bold text-[#8e9192] tracking-widest uppercase mb-2">
                  ADDITIONAL MESSAGE / NOTE
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us about your upcoming project or release goals..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#181818] border border-white/15 focus:border-white rounded-[4px] px-4 py-3 text-sm text-white focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-black font-headline font-extrabold text-sm tracking-widest uppercase rounded-[4px] hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>SENDING...</span>
                  </>
                ) : (
                  <>
                    <span>SUBMIT APPLICATION</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
