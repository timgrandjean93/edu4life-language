import React from 'react';

interface CookiePolicyPageProps {
  onHomeClick: () => void;
}

export const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({ onHomeClick: _onHomeClick }) => {
  return (
    <div className="page-container" style={{ paddingTop: '120px' }}>
      <h1 className="main-title" style={{ marginBottom: '40px' }}>
        Cookie Policy
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
            What Are Cookies?
          </h2>
          <p>
            Cookies are small text files that are placed on your device when you visit a website. 
            They are widely used to make websites work more efficiently and to provide information 
            to the website owners.
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
            Types of Cookies We Use
          </h2>
          <p style={{ marginBottom: '12px' }}>
            This website uses <strong>only analytical cookies</strong> via Google Analytics. 
            We do not use necessary/essential cookies or functional cookies.
          </p>
          <p style={{ marginBottom: '12px', fontStyle: 'italic', color: '#666' }}>
            <strong>Important:</strong> All cookies used on this website require your consent. 
            No cookies are placed without your explicit permission.
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
            Analytical Cookies (Google Analytics)
          </h2>
          <p style={{ marginBottom: '12px' }}>
            We use Google Analytics to understand how visitors interact with our website. 
            These cookies help us collect information about:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
            <li style={{ marginBottom: '8px' }}>Number of visitors to the website</li>
            <li style={{ marginBottom: '8px' }}>Which pages are viewed most frequently</li>
            <li style={{ marginBottom: '8px' }}>How long visitors stay on the website</li>
            <li style={{ marginBottom: '8px' }}>How visitors navigate through the website</li>
          </ul>
          <p style={{ marginBottom: '12px' }}>
            <strong>Purpose:</strong> These cookies help us improve the website's functionality and user experience.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>Consent required:</strong> Yes - these cookies are only placed if you accept them via the cookie banner.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>Data collected:</strong> All data is anonymous and aggregated. We cannot identify individual users.
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
            Specific Cookies Used
          </h2>
          <p style={{ marginBottom: '12px' }}>
            The following cookies are set by Google Analytics (only if you have accepted cookies):
          </p>
          
          <div style={{ 
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
              _ga
            </h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '8px' }}>
              <li style={{ marginBottom: '4px' }}><strong>Purpose:</strong> Distinguishes unique users</li>
              <li style={{ marginBottom: '4px' }}><strong>Duration:</strong> 2 years</li>
              <li style={{ marginBottom: '4px' }}><strong>Type:</strong> First-party cookie</li>
            </ul>
          </div>

          <div style={{ 
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
              _gid
            </h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '8px' }}>
              <li style={{ marginBottom: '4px' }}><strong>Purpose:</strong> Distinguishes unique users</li>
              <li style={{ marginBottom: '4px' }}><strong>Duration:</strong> 24 hours</li>
              <li style={{ marginBottom: '4px' }}><strong>Type:</strong> First-party cookie</li>
            </ul>
          </div>

          <div style={{ 
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
              _gat (or _gat_gtag_*)
            </h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '8px' }}>
              <li style={{ marginBottom: '4px' }}><strong>Purpose:</strong> Throttles request rate</li>
              <li style={{ marginBottom: '4px' }}><strong>Duration:</strong> 1 minute</li>
              <li style={{ marginBottom: '4px' }}><strong>Type:</strong> First-party cookie</li>
            </ul>
          </div>

          <p style={{ marginTop: '16px', fontStyle: 'italic', color: '#666' }}>
            <strong>Note:</strong> These cookies are set by Google Analytics and are subject to Google's 
            privacy policy. We have configured Google Analytics with privacy-friendly settings including 
            IP anonymization and disabled Google Signals and Ad Personalization.
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
            Managing Your Cookie Preferences
          </h2>
          <p style={{ marginBottom: '12px' }}>
            You have full control over cookies on this website:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Accept or Reject:</strong> When you first visit the website, you can accept or reject 
              analytical cookies via the cookie banner at the bottom of the page.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Change your preference:</strong> You can change your cookie preferences at any time by 
              clearing your browser cookies and revisiting the website. The cookie banner will appear again 
              allowing you to make a new choice.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Browser settings:</strong> You can also manage cookies directly in your browser settings. 
              Most browsers allow you to block or delete cookies. Please note that blocking cookies may 
              affect your experience on some websites.
            </li>
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
            Third-Party Cookies
          </h2>
          <p>
            Google Analytics cookies are technically third-party cookies (set by Google), but they are 
            used solely for our website analytics. We do not use any other third-party cookies for 
            advertising, social media, or other purposes.
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
            More Information
          </h2>
          <p style={{ marginBottom: '12px' }}>
            For more information about cookies and how to manage them, you can visit:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
            <li style={{ marginBottom: '8px' }}>
              <a 
                href="https://www.allaboutcookies.org" 
                target="_blank" 
                rel="noreferrer"
                style={{ color: '#51727C', textDecoration: 'underline' }}
              >
                www.allaboutcookies.org
              </a>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noreferrer"
                style={{ color: '#51727C', textDecoration: 'underline' }}
              >
                Google's Privacy Policy
              </a>
            </li>
          </ul>
          <p>
            If you have questions about our use of cookies, please contact us via{' '}
            <a 
              href="https://www.archipelagos.gr" 
              target="_blank" 
              rel="noreferrer"
              style={{ color: '#51727C', textDecoration: 'underline' }}
            >
              www.archipelagos.gr
            </a>{' '}
            or email{' '}
            <a 
              href="mailto:info@archipelagos.gr"
              style={{ color: '#51727C', textDecoration: 'underline' }}
            >
              info@archipelagos.gr
            </a>.
          </p>
        </section>

        <section style={{ marginTop: '48px', paddingTop: '24px', borderTop: '2px solid #51727C' }}>
          <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </section>
      </div>
    </div>
  );
};

