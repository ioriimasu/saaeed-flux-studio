import { MotiView } from 'moti';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Section } from '../components/Section';
import { useTheme } from '../theme/ThemeProvider';

const { width } = Dimensions.get('window');

export const HomeScreen = () => {
  const { theme } = useTheme();

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
            <Text style={{ color: theme.colors.primary }}>S</Text>
            <Text>AAED</Text>
          </Text>
          <Text style={[styles.heroSubtitle, { color: theme.colors.mutedForeground }]}>
            Platform Architect · RFID · SaaS
          </Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 200 }}
        >
          <Text style={[styles.heroDescription, { color: theme.colors.mutedForeground }]}>
            Build the future. Ship relentlessly.
          </Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 600, delay: 400 }}
        >
          <Button
            title="View My Work"
            variant="neon"
            size="lg"
            onPress={() => {}}
            style={styles.ctaButton}
          />
        </MotiView>
      </Section>

      {/* Quick Stats */}
      <Section style={styles.statsSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 600 }}
        >
          <View style={styles.statsGrid}>
            <Card variant="glass" style={styles.statCard}>
              <Text style={[styles.statNumber, { color: theme.colors.primary }]}>5+</Text>
              <Text style={[styles.statLabel, { color: theme.colors.mutedForeground }]}>Years Experience</Text>
            </Card>
            <Card variant="glass" style={styles.statCard}>
              <Text style={[styles.statNumber, { color: theme.colors.accent }]}>50+</Text>
              <Text style={[styles.statLabel, { color: theme.colors.mutedForeground }]}>Projects Shipped</Text>
            </Card>
            <Card variant="glass" style={styles.statCard}>
              <Text style={[styles.statNumber, { color: theme.colors.secondary }]}>100%</Text>
              <Text style={[styles.statLabel, { color: theme.colors.mutedForeground }]}>Client Satisfaction</Text>
            </Card>
          </View>
        </MotiView>
      </Section>

      {/* Featured Projects Preview */}
      <Section style={styles.projectsPreview}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 800 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
            Featured Work
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.mutedForeground }]}>
            Real-time RFID, mission-critical SaaS, and factory intelligence
          </Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 1000 }}
        >
          <Card variant="glass" style={styles.featuredProject}>
            <Text style={[styles.projectTitle, { color: theme.colors.foreground }]}>
              RFID Asset Tracking System
            </Text>
            <Text style={[styles.projectDescription, { color: theme.colors.mutedForeground }]}>
              Real-time asset tracking with 99.9% accuracy using advanced RFID technology
            </Text>
            <View style={styles.projectTags}>
              <Text style={[styles.projectTag, { color: theme.colors.primary, backgroundColor: theme.colors.primary + '20' }]}>
                React Native
              </Text>
              <Text style={[styles.projectTag, { color: theme.colors.accent, backgroundColor: theme.colors.accent + '20' }]}>
                Node.js
              </Text>
              <Text style={[styles.projectTag, { color: theme.colors.secondary, backgroundColor: theme.colors.secondary + '20' }]}>
                PostgreSQL
              </Text>
            </View>
          </Card>
        </MotiView>
      </Section>

      {/* Call to Action */}
      <Section style={styles.ctaSection}>
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 600, delay: 1200 }}
        >
          <Card variant="glass" style={styles.ctaCard}>
            <Text style={[styles.ctaTitle, { color: theme.colors.foreground }]}>
              Ready to Build Something Amazing?
            </Text>
            <Text style={[styles.ctaDescription, { color: theme.colors.mutedForeground }]}>
              Let's discuss your next project and bring your vision to life
            </Text>
            <Button
              title="Get In Touch"
              variant="primary"
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
    minHeight: 400,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '300',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },
  heroDescription: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '300',
  },
  ctaButton: {
    marginTop: 16,
  },
  statsSection: {
    paddingVertical: 40,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: 100,
    alignItems: 'center',
    padding: 20,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  projectsPreview: {
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
  featuredProject: {
    padding: 24,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  projectDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  projectTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  projectTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 12,
    fontWeight: '500',
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
});
