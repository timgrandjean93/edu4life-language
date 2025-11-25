import React from 'react';

interface TermsOfUsePageProps {
  onHomeClick: () => void;
}

export const TermsOfUsePage: React.FC<TermsOfUsePageProps> = ({ onHomeClick: _onHomeClick }) => {
  return (
    <div className="page-container" style={{ paddingTop: '120px' }}>
      <h1 className="main-title" style={{ marginBottom: '40px' }}>
        Terms of Use
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
            Restore4Life (Restoration of wetland complexes as life supporting systems in the Danube Basin), 
            herein referred to as "The Project", is a 48-month project that addresses the topic 
            HORIZON-MISS-2022-OCEAN-01.
          </p>
          <p style={{ marginTop: '12px' }}>
            The <strong>"LIVING FLOODPLAINS: LEARN, EXPLORE, RESTORE4LIFE TOOLBOX"</strong> (hereinafter referred to as 
            "this platform" or "the Toolbox") has been developed within the framework of The Project.
          </p>
          <p style={{ marginTop: '12px' }}>
            These Terms of Use govern your access to and use of this platform and all content, materials, 
            and resources available within the Toolbox. All content in the Toolbox is part of The Project 
            and is subject to these Terms of Use. By accessing or using this platform or any content within 
            the Toolbox, you agree to be bound by these Terms of Use.
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
            2. Definitions
          </h2>
          <p style={{ marginBottom: '12px' }}>
            <strong>"The Consortium"</strong> refers to all signatories, other than the European Commission, 
            of the Grant Agreement 101112736, which may have single or joint intellectual property rights 
            in relation to the project outcomes.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>"Materials"</strong> refer to all information, content, data, documents (e.g. white papers, 
            brochures, datasheets, FAQs, templates, press releases, etc.), downloads, files, text, images, 
            photographs, graphics, videos, webcasts, publications, tools, resources, software, code, programs, 
            applications and products made available or enabled via the Website.
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
            3. Use of Materials
          </h2>
          <p style={{ marginBottom: '12px' }}>
            The Materials on this website are developed as educational materials and are intended for 
            educational and non-commercial purposes.
          </p>
          <p style={{ marginBottom: '12px' }}>
            <strong>Educational Use:</strong> You may freely copy and use the Materials for educational 
            purposes without seeking prior permission, provided that:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
            <li style={{ marginBottom: '8px' }}>The use is non-commercial and educational in nature</li>
            <li style={{ marginBottom: '8px' }}>Appropriate attribution is given to the Restore4Life project</li>
            <li style={{ marginBottom: '8px' }}>The Materials are not modified in a way that misrepresents the original content</li>
          </ul>
          <p style={{ marginBottom: '12px' }}>
            <strong>Commercial Use:</strong> Copying or using Materials for economic or commercial purposes 
            is not permitted without explicit prior written consent. For commercial use inquiries, please 
            contact the rights holder:
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
            4. Disclaimer of Liability
          </h2>
          <p style={{ marginBottom: '12px' }}>
            The Consortium and the Project are not responsible for any inaccuracies, errors, omissions, 
            or problems that may arise from the use of the Materials or this website.
          </p>
          <p style={{ marginBottom: '12px' }}>
            The Materials are provided "as is" without warranty of any kind, either express or implied, 
            including but not limited to the implied warranties of merchantability, fitness for a particular 
            purpose, or non-infringement.
          </p>
          <p>
            The Consortium shall not be liable for any direct, indirect, incidental, special, consequential, 
            or punitive damages arising out of or relating to the use of or inability to use the Materials 
            or this website.
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
            5. Right to Modify Materials
          </h2>
          <p>
            The Consortium, as the rights holder, reserves the right to modify, update, or remove any 
            Materials on this website at any time without prior notice and without assuming any 
            responsibility for such modifications. The Consortium is not obligated to maintain or 
            update the Materials and may discontinue or change any aspect of the website at its sole discretion.
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
            6. Intellectual Property Rights
          </h2>
          <p style={{ marginBottom: '12px' }}>
            All Materials on this website are protected by intellectual property rights. The Consortium 
            may have single or joint intellectual property rights in relation to the project outcomes.
          </p>
          <p>
            While educational use is permitted as described above, all other rights are reserved. 
            Unauthorized use of Materials may violate copyright, trademark, or other laws.
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
            7. Links to Third-Party Websites
          </h2>
          <p>
            This website may contain links to third-party websites. The Consortium is not responsible 
            for the content, accuracy, or opinions expressed on such websites, and such websites are 
            not investigated, monitored, or checked for accuracy or completeness by the Consortium. 
            Inclusion of any linked website does not imply approval or endorsement by the Consortium.
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
            8. Changes to Terms of Use
          </h2>
          <p>
            The Consortium reserves the right to modify these Terms of Use at any time. Changes will be 
            effective immediately upon posting on this website. Your continued use of the website after 
            any changes constitutes your acceptance of the modified Terms of Use.
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
          <p style={{ marginBottom: '16px' }}>
            <strong>For questions about the Materials or commercial use inquiries:</strong>
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
            <strong>For questions about these Terms of Use or the website in general:</strong>
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
            For general inquiries about the Restore4Life project, please visit{' '}
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
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </section>
      </div>
    </div>
  );
};

