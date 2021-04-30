import React, { createContext, ReactNode, useEffect, useState } from 'react';
import LoadingModal from '../components/LoadingModal';
import api from '../services/api';

interface Project {
    name: string;
    description: string;
    viability: number;
    start_date: string;
    end_date: string;
    status: string;
    value: number;
    name_responsible: string;
    slug: string;
}

interface ProjectContextData {
    projects: Project[];
    refreshApiData(): void;
    getProject(slug: string | string[]): Project;
    createProject(
        name: string,
        description: string,
        viability: number,
        start_date: Date,
        end_date: Date,
        status: string,
        value: number,
        name_responsible: string,
    ): Promise<any>;
    updateProject(
        description: string,
        viability: number,
        status: string,
        slug: string,
    ): void;
    deleteProject(slug: string): void;
}

interface ProjectsProviderProps {
    children: ReactNode;
}

export const ProjectsContext = createContext({} as ProjectContextData);

export function ProjectsProvider({ children }: ProjectsProviderProps) {
    const [apiData, setApiData] = useState([] as Project[]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        api.get('/api/v1/projects')
            .then(response => {
                setApiData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function refreshApiData() {
        api.get('/api/v1/projects')
            .then(response => {
                setApiData(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function getProject(slug: string | string[]) {
        const response = apiData.find(project => project.slug === slug);

        return response;
    }

    async function createProject(
        name: string,
        description: string,
        viability: number,
        start_date: Date,
        end_date: Date,
        status: string,
        value: number,
        name_responsible: string,
    ) {
        setIsLoading(true);

        try {
            const response = await api.post('/api/v1/projects/create', {
                name,
                description,
                viability,
                start_date,
                end_date,
                status,
                value,
                name_responsible,
            });
            return response;
        } catch (error) {
            setIsLoading(false);
            throw new Error(error);
        }
    }

    function deleteProject(slug: string) {
        setIsLoading(true);
        api.delete(`/api/v1/project/${slug}`)
            .then(response => {
                refreshApiData();
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }

    function updateProject(
        description: string,
        viability: number,
        status: string,
        slug: string,
    ) {
        setIsLoading(true);
        api.put(`/api/v1/project/${slug}`, {
            description,
            viability,
            status,
        })
            .then(response => {
                refreshApiData();
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }

    return (
        <ProjectsContext.Provider
            value={{
                projects: apiData,
                getProject,
                refreshApiData,
                createProject,
                updateProject,
                deleteProject,
            }}
        >
            {children}

            {isLoading && <LoadingModal />}
        </ProjectsContext.Provider>
    );
}
