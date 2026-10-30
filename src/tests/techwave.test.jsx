import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { COMPANY_INFO } from '../data/companyData';

describe('Techwave Enterprises Website Suite', () => {
  it('validates verified company data configuration', () => {
    expect(COMPANY_INFO.name).toBe('Techwave Enterprises');
    expect(COMPANY_INFO.email).toBe('techwave8790@gmail.com');
    expect(COMPANY_INFO.contacts[0].name).toBe('Pramod Yamgar');
    expect(COMPANY_INFO.contacts[0].phone).toBe('9823158790');
    expect(COMPANY_INFO.contacts[1].name).toBe('Ganesh Jamdade');
    expect(COMPANY_INFO.contacts[1].phone).toBe('9975589895');
    expect(COMPANY_INFO.categories).toHaveLength(10);
  });

  it('renders Homepage with headline, CTAs, and categories', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Headline check
    expect(screen.getByText(/Powering Your Industry with/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore Our Products/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Our Team/i)).toBeInTheDocument();

    // Why Choose Us advantages
    expect(screen.getByText(/Quality-Focused Products/i)).toBeInTheDocument();
    expect(screen.getByText(/Reliable Supply and Support/i)).toBeInTheDocument();

    // 10 categories heading
    expect(screen.getByText(/Industrial Electrical Categories/i)).toBeInTheDocument();
  });

  it('renders About Us page with Mission, Vision, and Core Values', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Dedicated to Industrial Electrical Excellence/i)).toBeInTheDocument();
    expect(screen.getByText(/To provide dependable access to quality electrical and electronic products/i)).toBeInTheDocument();
    expect(screen.getByText(/To become a trusted sourcing partner for industrial/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Quality/i)).toBeInTheDocument();
  });

  it('renders Services & Products page with search and category filters', () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Industrial Electrical Products & Solutions/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search products, cables, panels, breakers/i)).toBeInTheDocument();
    expect(screen.getByText(/Request Product Information & Availability/i)).toBeInTheDocument();
  });

  it('renders Contact Us page with verified contact cards and address card', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Contact Techwave Enterprises/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Pramod Yamgar/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Ganesh Jamdade/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/techwave8790@gmail.com/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Get Directions \(Google Maps\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit Inquiry/i)).toBeInTheDocument();
  });
});
