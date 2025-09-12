import { MotiView } from 'moti';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Section } from '../components/Section';
import { useTheme } from '../theme/ThemeProvider';

const { width } = Dimensions.get('window');

interface ProjectDetailScreenProps {
  projectId: string;
}

export const ProjectDetailScreen = ({ projectId }: ProjectDetailScreenProps) => {
  const { theme } = useTheme();

  // In a real app, you'd fetch this data based on projectId
  const project = {
    id: projectId,
    title: 'RFID Asset Tracking System',
    description: 'Real-time asset tracking with 99.9% accuracy using advanced RFID technology and machine learning algorithms.',
    longDescription: 'This comprehensive RFID asset tracking system revolutionizes how organizations manage their physical assets. Built with cutting-edge technology, it provides real-time visibility into asset location, status, and movement patterns with unprecedented accuracy.',
    category: 'mobile',
    status: 'Live',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Redis'],
    features: [
      'Real-time asset tracking with 99.9% accuracy',
      'Machine learning-powered predictive analytics',
      'Cross-platform mobile and web applications',
      'Advanced reporting and dashboard system',
      'Integration with existing ERP systems',
      'Offline capability with data synchronization',
    ],
    challenges: [
      'Achieving 99.9% accuracy in challenging environments',
      'Handling large-scale data processing in real-time',
      'Ensuring cross-platform compatibility',
      'Implementing robust offline functionality',
    ],
    solutions: [
      'Developed custom RFID signal processing algorithms',
      'Built scalable microservices architecture',
      'Used React Native for consistent cross-platform experience',
      'Implemented intelligent data caching and sync mechanisms',
    ],
    results: [
      '99.9% tracking accuracy achieved',
      '50% reduction in asset loss',
      '75% improvement in inventory efficiency',
      'Real-time visibility for 10,000+ assets',
    ],
    images: [
      'project-dashboard',
      'mobile-app-screens',
      'analytics-overview',
      'integration-diagram',
    ],
    links: {
      live: 'https://rfid-tracker.example.com',
      github: 'https://github.com/saaeed/rfid-tracker',
      caseStudy: 'https://saaeed.dev/case-studies/rfid-tracker',
    },
  };

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
          <View style={styles.projectHeader}>
            <View style={styles.projectTitleContainer}>
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
          </View>
        </MotiView>
      </Section>

      {/* Project Images */}
      <Section style={styles.imagesSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 200 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
            Project Screenshots
          </Text>
        </MotiView>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.imagesScroll}
        >
          <View style={styles.imagesContainer}>
            {project.images.map((image, index) => (
              <MotiView
                key={index}
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'timing', duration: 400, delay: 400 + index * 100 }}
              >
                <Card variant="glass" style={styles.imageCard}>
                  <View style={styles.imagePlaceholder}>
                    <Text style={[styles.imageText, { color: theme.colors.mutedForeground }]}>
                      {image}
                    </Text>
                  </View>
                </Card>
              </MotiView>
            ))}
          </View>
        </ScrollView>
      </Section>

      {/* Project Details */}
      <Section style={styles.detailsSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 600 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
            Project Details
          </Text>
          <Text style={[styles.longDescription, { color: theme.colors.mutedForeground }]}>
            {project.longDescription}
          </Text>
        </MotiView>
      </Section>

      {/* Technologies */}
      <Section style={styles.technologiesSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 800 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
            Technologies Used
          </Text>
          <View style={styles.technologiesGrid}>
            {project.technologies.map((tech, index) => (
              <MotiView
                key={tech}
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'timing', duration: 300, delay: 1000 + index * 100 }}
              >
                <View style={[styles.techTag, { backgroundColor: theme.colors.muted }]}>
                  <Text style={[styles.techText, { color: theme.colors.foreground }]}>
                    {tech}
                  </Text>
                </View>
              </MotiView>
            ))}
          </View>
        </MotiView>
      </Section>

      {/* Features */}
      <Section style={styles.featuresSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 1000 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
            Key Features
          </Text>
          <Card variant="glass" style={styles.featuresCard}>
            {project.features.map((feature, index) => (
              <MotiView
                key={index}
                from={{ opacity: 0, translateX: -20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 300, delay: 1200 + index * 100 }}
              >
                <View style={styles.featureItem}>
                  <View style={[styles.featureBullet, { backgroundColor: theme.colors.primary }]} />
                  <Text style={[styles.featureText, { color: theme.colors.foreground }]}>
                    {feature}
                  </Text>
                </View>
              </MotiView>
            ))}
          </Card>
        </MotiView>
      </Section>

      {/* Challenges & Solutions */}
      <Section style={styles.challengesSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 1400 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
            Challenges & Solutions
          </Text>
        </MotiView>

        <View style={styles.challengesGrid}>
          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600, delay: 1600 }}
          >
            <Card variant="glass" style={styles.challengeCard}>
              <Text style={[styles.challengeTitle, { color: theme.colors.foreground }]}>
                Challenges
              </Text>
              {project.challenges.map((challenge, index) => (
                <View key={index} style={styles.challengeItem}>
                  <Text style={[styles.challengeText, { color: theme.colors.mutedForeground }]}>
                    • {challenge}
                  </Text>
                </View>
              ))}
            </Card>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600, delay: 1800 }}
          >
            <Card variant="glass" style={styles.challengeCard}>
              <Text style={[styles.challengeTitle, { color: theme.colors.foreground }]}>
                Solutions
              </Text>
              {project.solutions.map((solution, index) => (
                <View key={index} style={styles.challengeItem}>
                  <Text style={[styles.challengeText, { color: theme.colors.mutedForeground }]}>
                    • {solution}
                  </Text>
                </View>
              ))}
            </Card>
          </MotiView>
        </View>
      </Section>

      {/* Results */}
      <Section style={styles.resultsSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 2000 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
            Results
          </Text>
          <Card variant="glass" style={styles.resultsCard}>
            {project.results.map((result, index) => (
              <MotiView
                key={index}
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'timing', duration: 300, delay: 2200 + index * 100 }}
              >
                <View style={styles.resultItem}>
                  <View style={[styles.resultBullet, { backgroundColor: theme.colors.accent }]} />
                  <Text style={[styles.resultText, { color: theme.colors.foreground }]}>
                    {result}
                  </Text>
                </View>
              </MotiView>
            ))}
          </Card>
        </MotiView>
      </Section>

      {/* Links */}
      <Section style={styles.linksSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 2400 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
            Project Links
          </Text>
          <View style={styles.linksGrid}>
            <Button
              title="View Live Demo"
              variant="primary"
              size="lg"
              onPress={() => {}}
              style={styles.linkButton}
            />
            <Button
              title="View Code"
              variant="outline"
              size="lg"
              onPress={() => {}}
              style={styles.linkButton}
            />
            <Button
              title="Read Case Study"
              variant="neon"
              size="lg"
              onPress={() => {}}
              style={styles.linkButton}
            />
          </View>
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
    paddingTop: 60,
  },
  projectHeader: {
    marginBottom: 20,
  },
  projectTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  projectTitle: {
    fontSize: 28,
    fontWeight: '600',
    flex: 1,
    marginRight: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  projectDescription: {
    fontSize: 18,
    lineHeight: 26,
  },
  imagesSection: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  imagesScroll: {
    marginTop: 16,
  },
  imagesContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 4,
  },
  imageCard: {
    width: width * 0.7,
    padding: 0,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  imageText: {
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  detailsSection: {
    paddingVertical: 20,
  },
  longDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  technologiesSection: {
    paddingVertical: 20,
  },
  technologiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  techTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  techText: {
    fontSize: 14,
    fontWeight: '500',
  },
  featuresSection: {
    paddingVertical: 20,
  },
  featuresCard: {
    padding: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  featureBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 6,
  },
  featureText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  challengesSection: {
    paddingVertical: 20,
  },
  challengesGrid: {
    gap: 16,
  },
  challengeCard: {
    padding: 20,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  challengeItem: {
    marginBottom: 8,
  },
  challengeText: {
    fontSize: 14,
    lineHeight: 20,
  },
  resultsSection: {
    paddingVertical: 20,
  },
  resultsCard: {
    padding: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  resultBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 6,
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
  },
  linksSection: {
    paddingVertical: 20,
  },
  linksGrid: {
    gap: 16,
  },
  linkButton: {
    marginBottom: 8,
  },
});
