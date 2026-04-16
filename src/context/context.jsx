



// src/context/context.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ProfileContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ─── About Me State ───────────────────────────
  const [aboutMe, setAboutMe] = useState(null);
  const [aboutLoading, setAboutLoading] = useState(true);
  const [aboutError, setAboutError] = useState(null);
  // ─── Skills State ───────────────────────────
  const [skills, setSkills] = useState(null);
  const [skillLoading, setSkillLoading] = useState(true);
  const [skillError, setSkillError] = useState(null);

  const [projects, setProjects] = useState(null);


  // ─── Fetch Profile (unchanged) ───────────────
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/profile`);
        setProfile(res.data.data);   // ✅ your API returns { success, data: {...} }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ─── Fetch Skills Me ───────────────────────────
  useEffect(() => {
    const fetchAboutMe = async () => {
      try {
        // setAboutLoading(true);
        const res = await axios.get(`${API_URL}/api/about-me`);
        setAboutMe(res.data.data);   // ✅ your API returns { success, data: {...} }
      } catch (err) {
        setAboutError(err.message);
      } finally {
        // setAboutLoading(false);
      }
    };

    fetchAboutMe();
  }, []);

   useEffect(() => {
    const fetchSkills = async () => {
      try {
        // setSkillLoading(true);                                // ✅ Fix 2: was setAboutLoading
        const res = await axios.get(`${API_URL}/api/skills`); // ✅ Fix 3: was /api/getskills
        setSkills(res.data.data);
      } catch (err) {
        setSkillError(err.message);                           // ✅ Fix 2: was setAboutError
      } finally {
        // setSkillLoading(false);                               // ✅ Fix 2: was setSkilLoading
      }
    };
    fetchSkills();
  }, []);

     useEffect(() => {
    const fecthProjects = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/projects`); 
        setProjects(res.data.data);
      } catch (err) {
        // setSkillError(err.message);                           
      } 
    };
    fecthProjects();
  }, []);


  // ─── Update Profile (unchanged) ──────────────
  const updateProfile = async (updatedData) => {
    try {
      const res = await axios.put(`${API_URL}/api/profile`, updatedData);
      setProfile(res.data.data);     // ✅ same fix here
    } catch (err) {
      setError(err.message);
    }
  };

  // ─── Update About Me ──────────────────────────
  const updateAboutMe = async (updatedData) => {
    try {
      const res = await axios.put(`${API_URL}/api/about-me`, updatedData);
      setAboutMe(res.data.data);
    } catch (err) {
      setAboutError(err.message);
    }
  };

  return (
    <ProfileContext.Provider value={{
      // Profile (unchanged)
      profile,
      loading,
      error,
      updateProfile,
      projects,


      // About Me
      aboutMe,
      aboutLoading,
      aboutError,
      updateAboutMe,
      skills,
      skillLoading,
      skillError,

    }}>
      {children}
    </ProfileContext.Provider>
  );
};

// ─── Hooks (unchanged) ────────────────────────
export const useProfile = () => useContext(ProfileContext);
export const useAboutMe = () => useContext(ProfileContext);
export const useSkills = () => useContext(ProfileContext);
export const useProjects = () => useContext(ProfileContext);