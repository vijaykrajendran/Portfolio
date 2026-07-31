import { contact, Contact } from './contact';
import { Course, courses } from './courses';
import { Project, projects } from './projects';
import { Certification, certifications, kubeAstronautStatus } from './certifications';

interface Config {
  contact: Contact;
  projects: Project[];
  courses: Course[];
  certifications: Certification[];
  kubeAstronautStatus: typeof kubeAstronautStatus;
}

const config: Config = {
  contact,
  projects,
  courses,
  certifications,
  kubeAstronautStatus,
};

export const POSTS_PER_PAGE = 10;

export default config;
