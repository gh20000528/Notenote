"use client"


import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import axios from 'axios';

export const DocumentContext = createContext()

export const DocumentProvider = ({ children }) => {

    const createNote = async (userId) => {
        const notedata = {
            title: "Untitled",
            userId: `${userId}`,
            parentdocumentId: null
        }
        try {
            const res = await axios.post('http://localhost:3000/api/document/create', {notedata})


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <DocumentContext.Provider value={{ createNote }}>
            {children}
        </DocumentContext.Provider>
    )
}

export const useDocument = () => useContext(DocumentContext)