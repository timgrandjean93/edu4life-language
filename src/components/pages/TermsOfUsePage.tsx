import React from 'react';
import { useTranslation } from 'react-i18next';

interface TermsOfUsePageProps {
  onHomeClick: () => void;
}

export const TermsOfUsePage: React.FC<TermsOfUsePageProps> = ({ onHomeClick: _onHomeClick }) => {
  const { t, i18n } = useTranslation();
  
  const formatDate = (date: Date) => {
    if (i18n.language === 'nl') {
      return date.toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' });
    }
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
            {i18n.language === 'nl' ? (
              <>
                De <strong>&quot;{t('homePage.title')} {t('homePage.subtitle')} {t('homePage.subtitle2')}&quot;</strong> (hierna aangeduid als &quot;dit platform&quot; of &quot;de Toolbox&quot;) is ontwikkeld binnen het kader van Het Project.
              </>
            ) : (
              <>
                The <strong>&quot;{t('homePage.title')} {t('homePage.subtitle')} {t('homePage.subtitle2')}&quot;</strong> (hereinafter referred to as &quot;this platform&quot; or &quot;the Toolbox&quot;) has been developed within the framework of The Project.
              </>
            )}
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
