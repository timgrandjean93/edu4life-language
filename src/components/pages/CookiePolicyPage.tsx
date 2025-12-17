import React from 'react';
import { useTranslation } from 'react-i18next';

interface CookiePolicyPageProps {
  onHomeClick: () => void;
}

interface CookieInfo {
  name: string;
  purpose: string;
  purposeContent: string;
  duration: string;
  durationContent: string;
  type: string;
  typeContent: string;
}

interface PreferenceInfo {
  label: string;
  content: string;
}

export const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({ onHomeClick: _onHomeClick }) => {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="page-container" style={{ paddingTop: '120px' }}>
      <h1 className="main-title" style={{ marginBottom: '40px' }}>
        {t('cookiePolicyPage.title')}
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
            {t('cookiePolicyPage.section1.title')}
          </h2>
          <p>
            {t('cookiePolicyPage.section1.content')}
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
            {t('cookiePolicyPage.section2.title')}
          </h2>
          <p style={{ marginBottom: '12px' }}>
            {t('cookiePolicyPage.section2.intro')} <strong>{t('cookiePolicyPage.section2.onlyAnalytical')}</strong> {t('cookiePolicyPage.section2.viaGoogleAnalytics')}{' '}
            {t('cookiePolicyPage.section2.weDoNotUse')}
          </p>
          <p style={{ marginBottom: '12px', fontStyle: 'italic', color: '#666' }}>
            <strong>{t('cookiePolicyPage.section2.important')}</strong> {t('cookiePolicyPage.section2.importantContent')}
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
            {t('cookiePolicyPage.section3.title')}
          </h2>
          <p style={{ marginBottom: '12px' }}>
            {t('cookiePolicyPage.section3.intro')}
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
            {t('cookiePolicyPage.section3.infoItems', { returnObjects: true }).map((item: string, index: number) => (
              <li key={index} style={{ marginBottom: '8px' }}>{item}</li>
            ))}
          </ul>
          <p style={{ marginBottom: '12px' }}>
            <strong>{t('cookiePolicyPage.section3.purpose')}</strong> {t('cookiePolicyPage.section3.purposeContent')}
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>{t('cookiePolicyPage.section3.consentRequired')}</strong> {t('cookiePolicyPage.section3.consentRequiredContent')}
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>{t('cookiePolicyPage.section3.dataCollected')}</strong> {t('cookiePolicyPage.section3.dataCollectedContent')}
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
            {t('cookiePolicyPage.section4.title')}
          </h2>
          <p style={{ marginBottom: '12px' }}>
            {t('cookiePolicyPage.section4.intro')}
          </p>
          
          {(['_ga', '_gid', '_gat'] as const).map((cookieKey) => {
            const cookie = t(`cookiePolicyPage.section4.cookies.${cookieKey}`, { returnObjects: true }) as CookieInfo;
            return (
              <div key={cookieKey} style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '20px', 
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <h3 style={{ 
                  color: '#51727C', 
                  fontSize: '18px', 
                  fontWeight: 'bold',
                  marginBottom: '12px'
                }}>
                  {cookie.name}
                </h3>
                <ul style={{ paddingLeft: '20px', marginBottom: '8px' }}>
                  <li style={{ marginBottom: '4px' }}><strong>{cookie.purpose}</strong> {cookie.purposeContent}</li>
                  <li style={{ marginBottom: '4px' }}><strong>{cookie.duration}</strong> {cookie.durationContent}</li>
                  <li style={{ marginBottom: '4px' }}><strong>{cookie.type}</strong> {cookie.typeContent}</li>
                </ul>
              </div>
            );
          })}

          <p style={{ marginTop: '16px', fontStyle: 'italic', color: '#666' }}>
            <strong>{t('cookiePolicyPage.section4.note')}</strong> {t('cookiePolicyPage.section4.noteContent')}
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
            {t('cookiePolicyPage.section5.title')}
          </h2>
          <p style={{ marginBottom: '12px' }}>
            {t('cookiePolicyPage.section5.intro')}
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
            {t('cookiePolicyPage.section5.preferences', { returnObjects: true }).map((pref: PreferenceInfo, index: number) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                <strong>{pref.label}</strong> {pref.content}
              </li>
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
            {t('cookiePolicyPage.section6.title')}
          </h2>
          <p>
            {t('cookiePolicyPage.section6.content')}
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
            {t('cookiePolicyPage.section7.title')}
          </h2>
          <p style={{ marginBottom: '12px' }}>
            {t('cookiePolicyPage.section7.intro')}
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
            <li style={{ marginBottom: '8px' }}>
              <a 
                href="https://www.allaboutcookies.org" 
                target="_blank" 
                rel="noreferrer"
                style={{ color: '#51727C', textDecoration: 'underline' }}
              >
                {t('cookiePolicyPage.section7.links.allAboutCookies')}
              </a>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noreferrer"
                style={{ color: '#51727C', textDecoration: 'underline' }}
              >
                {t('cookiePolicyPage.section7.links.googlePrivacy')}
              </a>
            </li>
          </ul>
          <p>
            {t('cookiePolicyPage.section7.contact')}{' '}
            <a 
              href="https://www.archipelagos.gr" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: '#51727C', textDecoration: 'underline' }}
            >
              {t('cookiePolicyPage.section7.website')}
            </a>{' '}
            {t('cookiePolicyPage.section7.orEmail')}{' '}
            <a 
              href="mailto:info@archipelagos.gr"
              style={{ color: '#51727C', textDecoration: 'underline' }}
            >
              {t('cookiePolicyPage.section7.email')}
            </a>.
          </p>
        </section>

        <section style={{ marginTop: '48px', paddingTop: '24px', borderTop: '2px solid #51727C' }}>
          <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
            {t('cookiePolicyPage.lastUpdated')} {new Date().toLocaleDateString(i18n.language === 'nl' ? 'nl-NL' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </section>
      </div>
    </div>
  );
};

