import Image from "next/image";
import React from "react";
import SocialShare from "../utilities/SocialShare";

const ProjectDetailsContent = ({ projectInfo }) => {
  if (!projectInfo) {
    return <div className="container py-5 text-center">Data event tidak ditemukan.</div>;
  }

  const thumbFull = projectInfo.thumbFull || projectInfo.thumb || "faseldrone.jpg";
  const projectData = projectInfo.projectData || [];
  const title = projectInfo.title || "FASEL Crafting Collaboration";
  const description = projectInfo.description || projectInfo.short_desc || projectInfo.text || "";
  const btnLink = projectInfo.btn_link || "https://wa.me/6281298319944";
  const btnText = projectInfo.btn_text || "Daftar Event / Pelatihan";
  const imgSrc = thumbFull?.startsWith("/") || thumbFull?.startsWith("http") || thumbFull?.startsWith("data:")
    ? thumbFull
    : `/assets/img/projects/${thumbFull}`;

  return (
    <>
      <div className="project-details-area default-padding">
        <div className="container">
          <div className="project-details-items">
            <div className="thumb mb-4" style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <img src={imgSrc} alt={title} style={{ width: '100%', maxHeight: '520px', objectFit: 'cover' }} />
            </div>
            <div className="top-info">
              <div className="row">
                <div className="col-xl-4 col-lg-5 order-lg-last right-info">
                  <div className="project-info mt-15" style={{ backgroundImage: `url(/assets/img/shape/41.png)` }}>
                    <h4 className="title">Hubungi Kami untuk Info / Daftar</h4>
                    <ul>
                      <li>
                        Hotline <span>+62 812 9831 9944</span>
                      </li>
                      <li>
                        Email <span>faselconsulting@gmail.com</span>
                      </li>
                      <li>
                        Lokasi <span>Bogor, Jawa Barat</span>
                      </li>
                      {projectInfo.date && (
                        <li>
                          Jadwal <span>{projectInfo.date}</span>
                        </li>
                      )}
                    </ul>
                    <div className="mt-4">
                      <a href={btnLink} target="_blank" rel="noopener noreferrer" className="btn btn-theme circle btn-md w-100 text-center">
                        <i className="fab fa-whatsapp me-2"></i> {btnText}
                      </a>
                    </div>
                    <ul className="social mt-4">
                      <SocialShare />
                    </ul>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-7 pr-35 pr-md-15 pr-xs-15 left-info mt-md-10">
                  <h2 className="mb-4">{title}</h2>
                  {description.includes("<") ? (
                    <div className="text-muted mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: description }}></div>
                  ) : (
                    <p className="text-muted mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>{description}</p>
                  )}
                  {projectData.length > 0 && (
                    <ul className="check-list">
                      {projectData.map((list) => (
                        <li key={list.id}>
                          <h4>{list.title}</h4>
                          <p>{list.info}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="main-content">
              <p>
                A strong company is built by individuals who share the same vision, motivation, and values. <b>FASEL Crafting Impact</b> is an inspiring event designed to align company <b>core values</b>, strengthen employee engagement, and cultivate
                <b>leadership and enthusiasm</b> in every individual.
              </p>
              <p>
                <b>&quot;Great teams aren&apos;t just built—they are crafted with purpose.&quot; </b>
              </p>
              <p>
              🚀 Ready to take your team to the next level with <b>FASEL.inc?</b> Let’s create an unforgettable and impactful experience!
              </p>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <Image src="/assets/img/gallery/faselevent1.jpg" alt="Thumb" width={800} height={600} />
                </div>
                <div className="col-lg-6 col-md-6">
                  <Image src="/assets/img/gallery/faselindoor1.jpg" alt="Thumb" width={800} height={600} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsContent;
