import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Section } from '../components/Section';
import { useTheme } from '../theme/ThemeProvider';

const { width } = Dimensions.get('window');

export const ProjectsScreen = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', color: theme.colors.primary },
    { id: 'mobile', name: 'Mobile', color: theme.colors.accent },
    { id: 'web', name: 'Web', color: theme.colors.secondary },
    { id: 'backend', name: 'Backend', color: theme.colors.primary },
  ];

  const projects = [
    {
      id: 1,
      title: 'RFID Asset Tracking System',
      description: 'Real-time asset tracking with 99.9% accuracy using advanced RFID technology and machine learning algorithms.',
      category: 'mobile',
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'AWS'],
      image: 'rfid-system',
      status: 'Live',
      featured: true,
    },
    {
      id: 2,
      title: 'Factory Intelligence Dashboard',
      description: 'Real-time monitoring and analytics platform for manufacturing operations with predictive maintenance capabilities.',
      category: 'web',
      technologies: ['React', 'TypeScript', 'D3.js', 'WebSocket'],
      image: 'factory-dashboard',
      status: 'Live',
      featured: true,
    },
    {
      id: 3,
      title: 'SaaS Analytics Platform',
      description: 'Comprehensive analytics platform for SaaS businesses with real-time metrics and custom reporting.',
      category: 'backend',
      technologies: ['Node.js', 'MongoDB', 'Redis', 'Docker'],
      image: 'analytics-platform',
      status: 'Live',
      featured: false,
    },
    {
      id: 4,
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication and real-time transaction processing.',
      category: 'mobile',
      technologies: ['React Native', 'Redux', 'JWT', 'Biometrics'],
      image: 'banking-app',
      status: 'In Development',
      featured: false,
    },
    {
      id: 5,
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with inventory management, payment processing, and order tracking.',
      category: 'web',
      technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Vercel'],
      image: 'ecommerce-platform',
      status: 'Live',
      featured: false,
    },
    {
      id: 6,
      title: 'IoT Data Processing Pipeline',
      description: 'High-performance data processing pipeline for IoT devices with real-time analytics and alerting.',
      category: 'backend',
      technologies: ['Python', 'Apache Kafka', 'ClickHouse', 'Grafana'],
      image: 'iot-pipeline',
      status: 'Live',
      featured: false,
    },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <Section style={styles.heroSection}>
        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800 }}
        >
          <Text style={[styles.heroTitle, { color: theme.colors.foreground }]}>
            My Projects
          </Text>
          <Text style={[styles.heroSubtitle, { color: theme.colors.mutedForeground }]}>
            Real-world solutions built with cutting-edge technology
          </Text>
        </MotiView>
      </Section>

      {/* Featured Projects */}
      <Section style={styles.featuredSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 200 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
            Featured Work
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.mutedForeground }]}>
            Highlighted projects showcasing my expertise
          </Text>
        </MotiView>

        <View style={styles.featuredGrid}>
          {featuredProjects.map((project, index) => (
            <MotiView
              key={project.id}
              from={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 600, delay: 400 + index * 200 }}
            >
              <Card variant="glass" style={styles.featuredCard}>
                <View style={styles.projectImage}>
                  <Text style={[styles.projectImageText, { color: theme.colors.mutedForeground }]}>
                    {project.image}
                  </Text>
                </View>
                <View style={styles.projectContent}>
                  <View style={styles.projectHeader}>
                    <Text style={[styles.projectTitle, { color: theme.colors.foreground }]}>
                      {project.title}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: theme.colors.primary + '20' }]}>
                      <Text style={[styles.statusText, { color: theme.colors.primary }]}>
                        {project.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.projectDescription, { color: theme.colors.mutedForeground }]}>
                    {project.description}
                  </Text>
                  <View style={styles.technologies}>
                    {project.technologies.map((tech, techIndex) => (
                      <View 
                        key={techIndex}
                        style={[styles.techTag, { backgroundColor: theme.colors.muted }]}
                      >
                        <Text style={[styles.techText, { color: theme.colors.foreground }]}>
                          {tech}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </Card>
            </MotiView>
          ))}
        </View>
      </Section>

      {/* Category Filter */}
      <Section style={styles.filterSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 600 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
            All Projects
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            <View style={styles.categories}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => setSelectedCategory(category.id)}
                  style={[
                    styles.categoryButton,
                    {
                      backgroundColor: selectedCategory === category.id 
                        ? category.color 
                        : theme.colors.muted,
                    }
                  ]}
                >
                  <Text 
                    style={[
                      styles.categoryText,
                      { 
                        color: selectedCategory === category.id 
                          ? theme.colors.primaryForeground 
                          : theme.colors.foreground 
                      }
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </MotiView>
      </Section>

      {/* Projects Grid */}
      <Section style={styles.projectsSection}>
        <View style={styles.projectsGrid}>
          {filteredProjects.map((project, index) => (
            <MotiView
              key={project.id}
              from={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'timing', duration: 400, delay: index * 100 }}
            >
              <Card variant="glass" style={styles.projectCard}>
                <View style={styles.projectImage}>
                  <Text style={[styles.projectImageText, { color: theme.colors.mutedForeground }]}>
                    {project.image}
                  </Text>
                </View>
                <View style={styles.projectContent}>
                  <View style={styles.projectHeader}>
                    <Text style={[styles.projectTitle, { color: theme.colors.foreground }]}>
                      {project.title}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: theme.colors.primary + '20' }]}>
                      <Text style={[styles.statusText, { color: theme.colors.primary }]}>
                        {project.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.projectDescription, { color: theme.colors.mutedForeground }]}>
                    {project.description}
                  </Text>
                  <View style={styles.technologies}>
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <View 
                        key={techIndex}
                        style={[styles.techTag, { backgroundColor: theme.colors.muted }]}
                      >
                        <Text style={[styles.techText, { color: theme.colors.foreground }]}>
                          {tech}
                        </Text>
                      </View>
                    ))}
                    {project.technologies.length > 3 && (
                      <View style={[styles.techTag, { backgroundColor: theme.colors.muted }]}>
                        <Text style={[styles.techText, { color: theme.colors.foreground }]}>
                          +{project.technologies.length - 3}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </Card>
            </MotiView>
          ))}
        </View>
      </Section>

      {/* Call to Action */}
      <Section style={styles.ctaSection}>
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 600, delay: 800 }}
        >
          <Card variant="glass" style={styles.ctaCard}>
            <Text style={[styles.ctaTitle, { color: theme.colors.foreground }]}>
              Have a Project in Mind?
            </Text>
            <Text style={[styles.ctaDescription, { color: theme.colors.mutedForeground }]}>
              Let's discuss how we can bring your ideas to life with innovative solutions
            </Text>
            <Button
              title="Start a Project"
              variant="neon"
              size="lg"
              onPress={() => {}}
              style={styles.ctaButton}
            />
          </Card>
        </MotiView>
      </Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  featuredSection: {
    paddingVertical: 40,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  featuredGrid: {
    gap: 20,
  },
  featuredCard: {
    padding: 0,
    overflow: 'hidden',
  },
  projectImage: {
    height: 200,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectImageText: {
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  projectContent: {
    padding: 20,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  projectDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  technologies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  techText: {
    fontSize: 12,
    fontWeight: '500',
  },
  filterSection: {
    paddingVertical: 20,
  },
  categoryScroll: {
    marginTop: 16,
  },
  categories: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  projectsSection: {
    paddingVertical: 20,
  },
  projectsGrid: {
    gap: 16,
  },
  projectCard: {
    padding: 0,
    overflow: 'hidden',
  },
  ctaSection: {
    paddingVertical: 40,
  },
  ctaCard: {
    padding: 32,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  ctaButton: {
    marginTop: 8,
  },
});
