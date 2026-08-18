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
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);

  // ─── Combined "app is ready" flag ─────────────
  const appReady = !loading && !aboutLoading && !skillLoading && !projectsLoading;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/profile`);
        setProfile(res.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchAboutMe = async () => {
      try {
        setAboutLoading(true);
        const res = await axios.get(`${API_URL}/api/about-me`);
        setAboutMe(res.data.data);
      } catch (err) {
        setAboutError(err.message);
      } finally {
        setAboutLoading(false);
      }
    };
    fetchAboutMe();
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setSkillLoading(true);
        const res = await axios.get(`${API_URL}/api/skills`);
        setSkills(res.data.data);
      } catch (err) {
        setSkillError(err.message);
      } finally {
        setSkillLoading(false);
      }
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    const fecthProjects = async () => {
      try {
        setProjectsLoading(true);
        const res = await axios.get(`${API_URL}/api/projects`);
        setProjects(res.data.data);
      } catch (err) {
        setProjectsError(err.message);
      } finally {
        setProjectsLoading(false);
      }
    };
    fecthProjects();
  }, []);

  const updateProfile = async (updatedData) => {
    try {
      const res = await axios.put(`${API_URL}/api/profile`, updatedData);
      setProfile(res.data.data);
    } catch (err) {
      setError(err.message);
    }
  };

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
      profile,
      loading,
      error,
      updateProfile,
      projects,
      projectsLoading,
      projectsError,
      appReady,
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

export const useProfile = () => useContext(ProfileContext);
export const useAboutMe = () => useContext(ProfileContext);
export const useSkills = () => useContext(ProfileContext);
export const useProjects = () => useContext(ProfileContext);