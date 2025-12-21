import React from 'react';
import { useTranslation } from 'react-i18next';

interface TermsOfUsePageProps {
  onHomeClick: () => void;
}

export const TermsOfUsePage: React.FC<TermsOfUsePageProps> = ({ onHomeClick: _onHomeClick }) => {
  const { i18n } = useTranslation();
  // Force English translations for this page
  const t = i18n.getFixedT('en');
  
  // Reset background color to white/transparent
  React.useEffect(() => {
    const body = document.body;
    const originalBackground = body.style.backgroundColor;
    body.style.backgroundColor = '#ffffff';
    
    return () => {
      body.style.backgroundColor = originalBackground;
    };
  }, []);
  
  const formatDate = (date: Date) => {
    // Always use English date format for this page
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  return (
    <div className="page-container" style={{ paddingTop: '120px' }}>
      <h1 className="main-title" style={{ marginBottom: '40px' }}>
        {t('termsOfUse.title')}
      </h1>

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        fontFamily: 'Comfortaa, sans-serif',
        fontSize: '16px',
        lineHeight: '1.8',
        color: '#213547',
      }}>
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            color: '#51727C', 
            fontSize: '24px', 
            fontWeight: 'bold',
            marginBottom: '16px',
            marginTop: '32px'
          }}>
            {t('termsOfUse.section1.title')}
          </h2>
          <p>
            {t('termsOfUse.section1.p1')}
          </p>
          <p style={{ marginTop: '12px' }}>
            The <strong>&quot;{t('homePage.title')} {t('homePage.subtitle')} {t('homePage.subtitle2')}&quot;</strong> (hereinafter referred to as &quot;this platform&quot; or &quot;the Toolbox&quot;) has been developed within the framework of The Project.
          </p>
          <p style={{ marginTop: '12px' }}>
            {t('termsOfUse.section1.p3')}
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            color: '#51727C', 
            fontSize: '24px', 
            fontWeight: 'bold',
            marginBottom: '16px',
            marginTop: '32px'
          }}>
            {t('termsOfUse.section2.title')}
          </h2>
          <p style={{ marginBottom: '12px' }}>
            {t('termsOfUse.section2.consortium')}
          </p>
          <p style={{ marginBottom: '12px' }}>
            {t('termsOfUse.section2.materials')}
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            color: '#51727C', 
            fontSize: '24px', 
            fontWeight: 'bold',
            marginBottom: '16px',
            marginTop: '32px'
          }}>
            {t('termsOfUse.section3.title')}
          </h2>
          <p style={{ marginBottom: '12px' }}>
            {t('termsOfUse.section3.p1')}
          </p>
          
          {/* Creative Commons License Section */}
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '8px',
            marginBottom: '24px',
            border: '2px solid #51727C'
          }}>
            <p style={{ marginBottom: '16px', fontWeight: 'bold', fontSize: '18px' }}>
              {t('termsOfUse.section3.license')}
            </p>
            <p style={{ marginBottom: '12px' }}>
              {t('termsOfUse.section3.licenseDesc')}
            </p>
            <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
              <li style={{ marginBottom: '8px' }}>{t('termsOfUse.section3.licenseShare')}</li>
              <li style={{ marginBottom: '8px' }}>{t('termsOfUse.section3.licenseAdapt')}</li>
            </ul>
            <p style={{ marginBottom: '12px', fontWeight: 'bold' }}>
              {t('termsOfUse.section3.licenseConditions')}
            </p>
            <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
              <li style={{ marginBottom: '8px' }}>{t('termsOfUse.section3.licenseAttribution')}</li>
              <li style={{ marginBottom: '8px' }}>{t('termsOfUse.section3.licenseNonCommercial')}</li>
            </ul>
            <p style={{ marginBottom: '12px' }}>
              {t('termsOfUse.section3.licenseLink')}{' '}
              <a 
                href="https://creativecommons.org/licenses/by-nc/4.0/"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#51727C', textDecoration: 'underline' }}
              >
                https://creativecommons.org/licenses/by-nc/4.0/
              </a>
            </p>
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <a
                href="https://creativecommons.org/licenses/by-nc/4.0/"
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-block' }}
              >
                <img 
                  src="https://licensebuttons.net/l/by-nc/4.0/88x31.png" 
                  alt="Creative Commons Attribution-NonCommercial 4.0 International License"
                  style={{ height: '31px', width: 'auto' }}
                />
              </a>
            </div>
          </div>

          <p style={{ marginBottom: '12px' }}>
            <strong>{t('termsOfUse.section3.educationalUse')}</strong> {t('termsOfUse.section3.educationalUseDesc')}
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
            <li style={{ marginBottom: '8px' }}>{t('termsOfUse.section3.li1')}</li>
            <li style={{ marginBottom: '8px' }}>{t('termsOfUse.section3.li2')}</li>
            <li style={{ marginBottom: '8px' }}>{t('termsOfUse.section3.li3')}</li>
          </ul>
          <p style={{ marginBottom: '12px' }}>
            <strong>{t('termsOfUse.section3.commercialUse')}</strong> {t('termsOfUse.section3.commercialUseDesc')}
          </p>
          <p style={{ 
            padding: '16px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '8px',
            marginBottom: '12px'
          }}>
            <strong>Dr. Gabriela Costea</strong><br />
            Email: <a 
              href="mailto:gabriela.costea@igb-berlin.de"
              style={{ color: '#51727C', textDecoration: 'underline' }}
            >
              gabriela.costea@igb-berlin.de
            </a>
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            color: '#51727C', 
            fontSize: '24px', 
            fontWeight: 'bold',
            marginBottom: '16px',
            marginTop: '32px'
          }}>
            {t('termsOfUse.section4.title')}
          </h2>
          <p style={{ marginBottom: '12px' }}>
            {t('termsOfUse.section4.p1')}
          </p>
          <p style={{ marginBottom: '12px' }}>
            {t('termsOfUse.section4.p2')}
          </p>
          <p>
            {t('termsOfUse.section4.p3')}
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            color: '#51727C', 
            fontSize: '24px', 
            fontWeight: 'bold',
            marginBottom: '16px',
            marginTop: '32px'
          }}>
            {t('termsOfUse.section5.title')}
          </h2>
          <p>
            {t('termsOfUse.section5.p1')}
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            color: '#51727C', 
            fontSize: '24px', 
            fontWeight: 'bold',
            marginBottom: '16px',
            marginTop: '32px'
          }}>
            {t('termsOfUse.section6.title')}
          </h2>
          <p style={{ marginBottom: '12px' }}>
            {t('termsOfUse.section6.p1')}
          </p>
          <p>
            {t('termsOfUse.section6.p2')}
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            color: '#51727C', 
            fontSize: '24px', 
            fontWeight: 'bold',
            marginBottom: '16px',
            marginTop: '32px'
          }}>
            {t('termsOfUse.section7.title')}
          </h2>
          <p>
            {t('termsOfUse.section7.p1')}
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            color: '#51727C', 
            fontSize: '24px', 
            fontWeight: 'bold',
            marginBottom: '16px',
            marginTop: '32px'
          }}>
            {t('termsOfUse.section8.title')}
          </h2>
          <p>
            {t('termsOfUse.section8.p1')}
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            color: '#51727C', 
            fontSize: '24px', 
            fontWeight: 'bold',
            marginBottom: '16px',
            marginTop: '32px'
          }}>
            {t('termsOfUse.section9.title')}
          </h2>
          <p style={{ marginBottom: '16px' }}>
            <strong>{t('termsOfUse.section9.materialsTitle')}</strong>
          </p>
          <p style={{ 
            padding: '16px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '8px',
            marginBottom: '24px'
          }}>
            <strong>Dr. Gabriela Costea</strong><br />
            Email: <a 
              href="mailto:gabriela.costea@igb-berlin.de"
              style={{ color: '#51727C', textDecoration: 'underline' }}
            >
              gabriela.costea@igb-berlin.de
            </a>
          </p>
          <p style={{ marginBottom: '16px' }}>
            <strong>{t('termsOfUse.section9.termsTitle')}</strong>
          </p>
          <p style={{ 
            padding: '16px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '8px',
            marginBottom: '24px'
          }}>
            <strong>Archipelagos Institute of Marine Conservation</strong><br />
            Website: <a 
              href="https://www.archipelagos.gr" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: '#51727C', textDecoration: 'underline' }}
            >
              www.archipelagos.gr
            </a><br />
            Email: <a 
              href="mailto:info@archipelagos.gr"
              style={{ color: '#51727C', textDecoration: 'underline' }}
            >
              info@archipelagos.gr
            </a>
          </p>
          <p>
            {t('termsOfUse.section9.generalInquiries')}{' '}
            <a 
              href="https://www.restore4life.eu" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: '#51727C', textDecoration: 'underline' }}
            >
              www.restore4life.eu
            </a>.
          </p>
        </section>

        <section style={{ marginTop: '48px', paddingTop: '24px', borderTop: '2px solid #51727C' }}>
          <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
            {t('termsOfUse.lastUpdated')} {formatDate(new Date())}
          </p>
        </section>
      </div>
    </div>
  );
};
