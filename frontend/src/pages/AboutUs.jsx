/**
 * About Us page component for the church website.
 * Displays church history, mission, vision, leadership, and contact information.
 * Includes interactive elements and responsive design for better user experience.
 */

import React, { useEffect, useState } from 'react';
import BackToTop from '../components/BackToTop';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

function AboutUs() {
  // State management for dynamic content
  const [content, setContent] = useState({
    about: null,
    mission: null,
    vision: null,
    history: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch dynamic content from backend
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        
        // Fetch different content sections
        const [aboutRes, missionRes, visionRes, historyRes] = await Promise.allSettled([
          axios.get('/api/content/about'),
          axios.get('/api/content/mission'),
          axios.get('/api/content/vision'),
          axios.get('/api/content/history')
        ]);

        // Process results and handle any failures gracefully
        setContent({
          about: aboutRes.status === 'fulfilled' ? aboutRes.value.data : null,
          mission: missionRes.status === 'fulfilled' ? missionRes.value.data : null,
          vision: visionRes.status === 'fulfilled' ? visionRes.value.data : null,
          history: historyRes.status === 'fulfilled' ? historyRes.value.data : null
        });

      } catch (error) {
        console.error('Error fetching content:', error);
        setError('Unable to load page content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Loading state
  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading content...</p>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Content</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <div className="about-us-page">
        {/* Hero Section */}
        <section className="hero-section bg-primary text-white py-5 mb-5">
          <Container>
            <Row className="align-items-center">
              <Col lg={8}>
                <h1 className="display-4 fw-bold mb-3">About Our Church</h1>
                <p className="lead mb-4">
                  Welcome to our church family! We are a community of believers dedicated to 
                  serving God and our community with love, faith, and compassion.
                </p>
                <Button variant="light" size="lg" href="#our-story">
                  <i className="fas fa-arrow-down me-2"></i>
                  Learn Our Story
                </Button>
              </Col>
              <Col lg={4} className="text-center">
                <i className="fas fa-church display-1 opacity-75"></i>
              </Col>
            </Row>
          </Container>
        </section>
        <Container>
          {/* Our Story Section */}
          <section id="our-story" className="mb-5">
            <Row>
              <Col lg={8} className="mx-auto">
                <Card className="shadow-sm border-0">
                  <Card.Body className="p-5">
                    <div className="text-center mb-4">
                      <i className="fas fa-book-open text-primary display-4 mb-3"></i>
                      <h2 className="h1 text-primary">Our Story</h2>
                    </div>
                    {content.about ? (
                      <div>
                        <h3 className="h4 mb-3">{content.about.title}</h3>
                        <p className="lead" style={{ whiteSpace: 'pre-line' }}>
                          {content.about.body}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="h4 mb-3">Welcome to Our Church Family</h3>
                        <p className="lead">
                          Our church has been a cornerstone of faith and community for many years. 
                          We believe in the power of God's love to transform lives and communities. 
                          Our doors are always open to anyone seeking spiritual growth, fellowship, 
                          and a place to call home.
                        </p>
                        <p>
                          We are committed to spreading the Gospel, serving our community, and 
                          nurturing spiritual growth in all who enter our doors. Whether you're 
                          a lifelong believer or just beginning your spiritual journey, you'll 
                          find a warm welcome here.
                        </p>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>
          {/* Mission & Vision Section */}
          <section className="mb-5">
            <Row>
              <Col md={6} className="mb-4">
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4 text-center">
                    <i className="fas fa-bullseye text-success display-4 mb-3"></i>
                    <h3 className="text-success mb-3">Our Mission</h3>
                    {content.mission ? (
                      <div>
                        <h4 className="h5 mb-3">{content.mission.title}</h4>
                        <p style={{ whiteSpace: 'pre-line' }}>
                          {content.mission.body}
                        </p>
                      </div>
                    ) : (
                      <p>
                        To spread the love of Christ through worship, fellowship, and service. 
                        We are committed to building a strong community of believers who support 
                        one another and reach out to those in need.
                      </p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="mb-4">
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4 text-center">
                    <i className="fas fa-eye text-info display-4 mb-3"></i>
                    <h3 className="text-info mb-3">Our Vision</h3>
                    {content.vision ? (
                      <div>
                        <h4 className="h5 mb-3">{content.vision.title}</h4>
                        <p style={{ whiteSpace: 'pre-line' }}>
                          {content.vision.body}
                        </p>
                      </div>
                    ) : (
                      <p>
                        To be a beacon of hope and love in our community, transforming lives 
                        through the power of God's word and creating disciples who will continue 
                        His work for generations to come.
                      </p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>
          {/* Church History Section */}
          <section className="mb-5">
            <Row>
              <Col lg={10} className="mx-auto">
                <Card className="shadow-sm border-0">
                  <Card.Body className="p-5">
                    <div className="text-center mb-4">
                      <i className="fas fa-history text-warning display-4 mb-3"></i>
                      <h2 className="text-warning">Our History</h2>
                    </div>
                    {content.history ? (
                      <div>
                        <h3 className="h4 mb-3">{content.history.title}</h3>
                        <p style={{ whiteSpace: 'pre-line' }}>
                          {content.history.body}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="h4 mb-3">A Legacy of Faith</h3>
                        <p>
                          Our church was founded with a simple mission: to create a place where 
                          people could come together to worship, learn, and grow in their faith. 
                          Over the years, we have grown from a small gathering to a thriving 
                          community that serves hundreds of families.
                        </p>
                        <p>
                          Throughout our history, we have remained committed to our core values 
                          of faith, hope, and love. We have weathered challenges and celebrated 
                          victories, always with God at the center of everything we do.
                        </p>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>
          {/* Core Values Section */}
          <section className="mb-5">
            <div className="text-center mb-5">
              <h2 className="display-5 text-primary">Our Core Values</h2>
              <p className="lead text-muted">The principles that guide everything we do</p>
            </div>
            <Row>
              <Col md={4} className="mb-4">
                <Card className="h-100 text-center border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <i className="fas fa-heart text-danger display-4 mb-3"></i>
                    <h4 className="text-danger">Love</h4>
                    <p>
                      We believe in showing God's love through our actions, words, and service 
                      to others, creating a welcoming environment for all.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="h-100 text-center border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <i className="fas fa-praying-hands text-primary display-4 mb-3"></i>
                    <h4 className="text-primary">Faith</h4>
                    <p>
                      Our faith in Jesus Christ is the foundation of everything we do, 
                      guiding our decisions and shaping our community.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="h-100 text-center border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <i className="fas fa-hands-helping text-success display-4 mb-3"></i>
                    <h4 className="text-success">Service</h4>
                    <p>
                      We are called to serve others as Christ served us, reaching out to 
                      our community and those in need around the world.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>
          {/* Call to Action Section */}
          <section className="text-center py-5 mb-5">
            <Card className="bg-light border-0">
              <Card.Body className="p-5">
                <h2 className="display-6 text-primary mb-3">Join Our Community</h2>
                <p className="lead mb-4">
                  We would love to welcome you into our church family. Come as you are 
                  and discover the joy of fellowship and faith.
                </p>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <Button variant="primary" size="lg" href="/contact">
                    <i className="fas fa-envelope me-2"></i>
                    Contact Us
                  </Button>
                  <Button variant="outline-primary" size="lg" href="/ministries">
                    <i className="fas fa-users me-2"></i>
                    Our Ministries
                  </Button>
                  <Button variant="outline-success" size="lg" href="/bulletins">
                    <i className="fas fa-calendar me-2"></i>
                    Service Times
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </section>
        </Container>
      </div>
      <BackToTop />
    </>
  );
}

export default AboutUs;
