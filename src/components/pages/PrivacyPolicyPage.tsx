import React from 'react';

interface PrivacyPolicyPageProps {
  onHomeClick: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onHomeClick }) => {
  return (
    <div className="page-container" style={{ paddingTop: '120px' }}>
      <h1 className="main-title" style={{ marginBottom: '40px' }}>
        Privacy Policy
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
            1. Introduction
          </h2>
          <p>
            This privacy policy describes how we handle your personal data when you use this website. 
            We respect your privacy and are committed to protecting your personal data in accordance 
            with the General Data Protection Regulation (GDPR).
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
            2. Data Controller
          </h2>
          <p>
            This website is managed by the Restore4Life project. The technical responsibility lies with 
            Archipelagos Institute of Marine Conservation. For questions about this privacy policy, 
            please contact us via{' '}
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

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            color: '#51727C', 
            fontSize: '24px', 
            fontWeight: 'bold',
            marginBottom: '16px',
            marginTop: '32px'
          }}>
            3. Data We Collect
          </h2>
          <p style={{ marginBottom: '12px' }}>
            We only collect data necessary for the operation of this website:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Analytical data:</strong> Via Google Analytics, we collect anonymous usage statistics, 
              such as the number of visitors, which pages are viewed, and how long users stay on the website. 
              This data is only collected if you have given consent for the use of cookies. 
              <strong> We do not store any personal data that can identify individual users.</strong>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Technical data:</strong> We automatically collect certain technical information, such as 
              your IP address (anonymized), browser type, and operating system. This data is used for 
              technical purposes and is not used to identify you.
            </li>
          </ul>
          <p style={{ marginTop: '12px', fontStyle: 'italic', color: '#666' }}>
            <strong>Important:</strong> We do not store personal data that can be used to identify individual users. 
            The analytics data we collect is aggregated and anonymous. We cannot trace or identify individual 
            visitors through Google Analytics.
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
            4. Cookies
          </h2>
          <p style={{ marginBottom: '12px' }}>
            This website uses cookies only for analytical purposes via Google Analytics. 
            We use the following types of cookies:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Analytical cookies:</strong> These cookies help us understand how visitors use the website. 
              These cookies are only placed if you have given consent.
            </li>
          </ul>
          <p>
            You can withdraw your consent for cookies at any time by deleting cookies in your browser settings. 
            Since we do not store personal data that can identify individual users, we cannot delete specific 
            user data upon request. However, you can always clear your browser cookies or disable cookies 
            in your browser settings to prevent future tracking.
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
            5. Purposes of Data Processing
          </h2>
          <p style={{ marginBottom: '12px' }}>
            We use your data for the following purposes:
          </p>
          <ul style={{ paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>Improving the functionality and user experience of the website</li>
            <li style={{ marginBottom: '8px' }}>Analyzing website usage to optimize content</li>
            <li style={{ marginBottom: '8px' }}>Ensuring the technical security of the website</li>
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
            6. Your Rights
          </h2>
          <p style={{ marginBottom: '12px' }}>
            Under GDPR, individuals have certain rights regarding their personal data. However, 
            <strong> these rights are not applicable in our case</strong> because:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
            <li style={{ marginBottom: '8px' }}>
              We do not store personal data that can identify individual users
            </li>
            <li style={{ marginBottom: '8px' }}>
              All analytics data is anonymous and aggregated
            </li>
            <li style={{ marginBottom: '8px' }}>
              We cannot trace or identify individual visitors
            </li>
          </ul>
          <p style={{ marginBottom: '12px' }}>
            Therefore, the following GDPR rights are not applicable:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Right of access:</strong> Not applicable - we have no personal data about you to provide
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Right to rectification:</strong> Not applicable - we do not store personal data that can be corrected
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Right to erasure:</strong> Not applicable - we have no personal data to delete. You can clear your browser cookies at any time
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Right to restriction:</strong> You can withdraw your consent for cookies at any time via your browser settings
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Right to object:</strong> You can reject cookies via the cookie banner or disable cookies in your browser settings
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Right to data portability:</strong> Not applicable - we have no personal data to export
            </li>
          </ul>
          <p style={{ marginTop: '12px' }}>
            If you have any questions or concerns, you can contact us via{' '}
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

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            color: '#51727C', 
            fontSize: '24px', 
            fontWeight: 'bold',
            marginBottom: '16px',
            marginTop: '32px'
          }}>
            7. Security
          </h2>
          <p>
            We take appropriate technical and organizational measures to protect your personal data against 
            unauthorized access, loss, or destruction. Google Analytics uses anonymized IP addresses and 
            we have configured the settings to maximize privacy. We do not store personal data that can 
            identify individual users.
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
            8. Changes to This Privacy Policy
          </h2>
          <p>
            We reserve the right to modify this privacy policy. Changes will be published on this page. 
            We recommend that you consult this page regularly to stay informed of any changes.
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
            9. Contact
          </h2>
          <p>
            For questions about this privacy policy or about the processing of your personal data, please contact us via{' '}
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
