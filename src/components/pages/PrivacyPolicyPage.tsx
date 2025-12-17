import React from 'react';
import { useTranslation } from 'react-i18next';

interface PrivacyPolicyPageProps {
  onHomeClick: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onHomeClick: _onHomeClick }) => {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="page-container" style={{ paddingTop: '120px' }}>
      <h1 className="main-title" style={{ marginBottom: '40px' }}>
        {t('privacyPolicyPage.title')}
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
            {t('privacyPolicyPage.section1.title')}
          </h2>
          <p>
            {t('privacyPolicyPage.section1.content')}
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
            {t('privacyPolicyPage.section2.title')}
          </h2>
          <p>
            {t('privacyPolicyPage.section2.content')}{' '}
            <a 
              href="https://www.archipelagos.gr" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: '#51727C', textDecoration: 'underline' }}
            >
              {t('privacyPolicyPage.section2.website')}
            </a>{' '}
            {t('privacyPolicyPage.section2.orEmail')}{' '}
            <a 
              href="mailto:info@archipelagos.gr"
              style={{ color: '#51727C', textDecoration: 'underline' }}
            >
              {t('privacyPolicyPage.section2.email')}
            </a>.
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
            {t('privacyPolicyPage.section3.title')}
          </h2>
          <p style={{ marginBottom: '12px' }}>
            {t('privacyPolicyPage.section3.intro')}
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>{t('privacyPolicyPage.section3.analyticalData.label')}</strong> {t('privacyPolicyPage.section3.analyticalData.content')}{' '}
              <strong> {t('privacyPolicyPage.section3.analyticalData.important')}</strong>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>{t('privacyPolicyPage.section3.technicalData.label')}</strong> {t('privacyPolicyPage.section3.technicalData.content')}
            </li>
          </ul>
          <p style={{ marginTop: '12px', fontStyle: 'italic', color: '#666' }}>
            <strong>{t('privacyPolicyPage.section3.important')}</strong> {t('privacyPolicyPage.section3.importantContent')}
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
            {t('privacyPolicyPage.section4.title')}
          </h2>
          <p style={{ marginBottom: '12px' }}>
            {t('privacyPolicyPage.section4.intro')}
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>{t('privacyPolicyPage.section4.analyticalCookies.label')}</strong> {t('privacyPolicyPage.section4.analyticalCookies.content')}
            </li>
          </ul>
          <p>
            {t('privacyPolicyPage.section4.withdrawConsent')}
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
            {t('privacyPolicyPage.section5.title')}
          </h2>
          <p style={{ marginBottom: '12px' }}>
            {t('privacyPolicyPage.section5.intro')}
          </p>
          <ul style={{ paddingLeft: '24px' }}>
            {(t('privacyPolicyPage.section5.purposes', { returnObjects: true }) as string[]).map((purpose: string, index: number) => (
              <li key={index} style={{ marginBottom: '8px' }}>{purpose}</li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            color: '#51727C', 
            fontSize: '24px', 
            fontWeight: 'bold',
            marginBottom: '16px',
            marginTop: '32px'
          }}>
            {t('privacyPolicyPage.section6.title')}
          </h2>
          <p style={{ marginBottom: '12px' }}>
            {t('privacyPolicyPage.section6.intro')}{' '}
            <strong> {t('privacyPolicyPage.section6.notApplicable')}</strong> {t('privacyPolicyPage.section6.because')}
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
            {(t('privacyPolicyPage.section6.reasons', { returnObjects: true }) as string[]).map((reason: string, index: number) => (
              <li key={index} style={{ marginBottom: '8px' }}>{reason}</li>
            ))}
          </ul>
          <p style={{ marginBottom: '12px' }}>
            {t('privacyPolicyPage.section6.therefore')}
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>{t('privacyPolicyPage.section6.rights.access.label')}</strong> {t('privacyPolicyPage.section6.rights.access.content')}
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>{t('privacyPolicyPage.section6.rights.rectification.label')}</strong> {t('privacyPolicyPage.section6.rights.rectification.content')}
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>{t('privacyPolicyPage.section6.rights.erasure.label')}</strong> {t('privacyPolicyPage.section6.rights.erasure.content')}
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>{t('privacyPolicyPage.section6.rights.restriction.label')}</strong> {t('privacyPolicyPage.section6.rights.restriction.content')}
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>{t('privacyPolicyPage.section6.rights.object.label')}</strong> {t('privacyPolicyPage.section6.rights.object.content')}
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>{t('privacyPolicyPage.section6.rights.portability.label')}</strong> {t('privacyPolicyPage.section6.rights.portability.content')}
            </li>
          </ul>
          <p style={{ marginTop: '12px' }}>
            {t('privacyPolicyPage.section6.contact')}{' '}
            <a 
              href="https://www.archipelagos.gr" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: '#51727C', textDecoration: 'underline' }}
            >
              {t('privacyPolicyPage.section6.website')}
            </a>{' '}
            {t('privacyPolicyPage.section6.orEmail')}{' '}
            <a 
              href="mailto:info@archipelagos.gr"
              style={{ color: '#51727C', textDecoration: 'underline' }}
            >
              {t('privacyPolicyPage.section6.email')}
            </a>.
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
            {t('privacyPolicyPage.section7.title')}
          </h2>
          <p>
            {t('privacyPolicyPage.section7.content')}
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
            {t('privacyPolicyPage.section8.title')}
          </h2>
          <p>
            {t('privacyPolicyPage.section8.content')}
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
            {t('privacyPolicyPage.section9.title')}
          </h2>
          <p>
            {t('privacyPolicyPage.section9.content')}{' '}
            <a 
              href="https://www.archipelagos.gr" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: '#51727C', textDecoration: 'underline' }}
            >
              {t('privacyPolicyPage.section9.website')}
            </a>{' '}
            {t('privacyPolicyPage.section9.orEmail')}{' '}
            <a 
              href="mailto:info@archipelagos.gr"
              style={{ color: '#51727C', textDecoration: 'underline' }}
            >
              {t('privacyPolicyPage.section9.email')}
            </a>.
          </p>
        </section>

        <section style={{ marginTop: '48px', paddingTop: '24px', borderTop: '2px solid #51727C' }}>
          <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
            {t('privacyPolicyPage.lastUpdated')} {new Date().toLocaleDateString(i18n.language === 'nl' ? 'nl-NL' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </section>
      </div>
    </div>
  );
};
