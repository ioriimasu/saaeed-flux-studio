import { MotiView } from 'moti';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Section } from '../components/Section';
import { useTheme } from '../theme/ThemeProvider';

const { width } = Dimensions.get('window');

export const AboutScreen = () => {
  const { theme } = useTheme();

  const skills = [
    { name: 'React Native', level: 95, color: theme.colors.primary },
    { name: 'TypeScript', level: 90, color: theme.colors.accent },
    { name: 'Node.js', level: 88, color: theme.colors.secondary },
    { name: 'PostgreSQL', level: 85, color: theme.colors.primary },
    { name: 'AWS', level: 80, color: theme.colors.accent },
    { name: 'Docker', level: 75, color: theme.colors.secondary },
  ];

  const experience = [
    {
      title: 'Senior Platform Architect',
      company: 'TechCorp Solutions',
      period: '2022 - Present',
      description: 'Leading development of mission-critical RFID tracking systems and real-time data processing platforms.',
    },
    {
      title: 'Full Stack Developer',
      company: 'InnovateLab',
      period: '2020 - 2022',
      description: 'Built scalable SaaS applications and mobile solutions for enterprise clients.',
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency',
      period: '2019 - 2020',
      description: 'Developed responsive web applications and mobile-first user interfaces.',
    },
  ];

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
            About Me
          </Text>
          <Text style={[styles.heroSubtitle, { color: theme.colors.mutedForeground }]}>
            Platform Architect with a passion for building scalable systems
          </Text>
        </MotiView>
      </Section>

      {/* Bio Section */}
      <Section style={styles.bioSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 200 }}
        >
          <Card variant="glass" style={styles.bioCard}>
            <Text style={[styles.bioText, { color: theme.colors.foreground }]}>
              I'm a passionate platform architect specializing in RFID technology, real-time data processing, 
              and mission-critical SaaS applications. With over 5 years of experience, I've built systems 
              that handle millions of data points and serve thousands of users.
            </Text>
            <Text style={[styles.bioText, { color: theme.colors.foreground }]}>
              My expertise spans from low-level hardware integration to high-level system architecture, 
              always focusing on performance, scalability, and user experience.
            </Text>
          </Card>
        </MotiView>
      </Section>

      {/* Skills Section */}
      <Section style={styles.skillsSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 400 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
            Technical Skills
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.mutedForeground }]}>
            Technologies I work with daily
          </Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 600 }}
        >
          <View style={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <MotiView
                key={skill.name}
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'timing', duration: 400, delay: 800 + index * 100 }}
              >
                <Card variant="glass" style={styles.skillCard}>
                  <View style={styles.skillHeader}>
                    <Text style={[styles.skillName, { color: theme.colors.foreground }]}>
                      {skill.name}
                    </Text>
                    <Text style={[styles.skillLevel, { color: skill.color }]}>
                      {skill.level}%
                    </Text>
                  </View>
                  <View style={[styles.skillBar, { backgroundColor: theme.colors.muted }]}>
                    <MotiView
                      from={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ type: 'timing', duration: 1000, delay: 1000 + index * 100 }}
                      style={[styles.skillProgress, { backgroundColor: skill.color }]}
                    />
                  </View>
                </Card>
              </MotiView>
            ))}
          </View>
        </MotiView>
      </Section>

      {/* Experience Section */}
      <Section style={styles.experienceSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 800 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
            Experience
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.mutedForeground }]}>
            My professional journey
          </Text>
        </MotiView>

        <View style={styles.timeline}>
          {experience.map((job, index) => (
            <MotiView
              key={index}
              from={{ opacity: 0, translateX: -50 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing', duration: 600, delay: 1000 + index * 200 }}
            >
              <Card variant="glass" style={styles.experienceCard}>
                <View style={styles.experienceHeader}>
                  <Text style={[styles.jobTitle, { color: theme.colors.foreground }]}>
                    {job.title}
                  </Text>
                  <Text style={[styles.jobPeriod, { color: theme.colors.primary }]}>
                    {job.period}
                  </Text>
                </View>
                <Text style={[styles.companyName, { color: theme.colors.accent }]}>
                  {job.company}
                </Text>
                <Text style={[styles.jobDescription, { color: theme.colors.mutedForeground }]}>
                  {job.description}
                </Text>
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
          transition={{ type: 'timing', duration: 600, delay: 1400 }}
        >
          <Card variant="glass" style={styles.ctaCard}>
            <Text style={[styles.ctaTitle, { color: theme.colors.foreground }]}>
              Let's Work Together
            </Text>
            <Text style={[styles.ctaDescription, { color: theme.colors.mutedForeground }]}>
              I'm always interested in new challenges and opportunities to build amazing things
            </Text>
            <Button
              title="Get In Touch"
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
  bioSection: {
    paddingVertical: 20,
  },
  bioCard: {
    padding: 24,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  skillsSection: {
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
  skillsGrid: {
    gap: 16,
  },
  skillCard: {
    padding: 20,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  skillName: {
    fontSize: 16,
    fontWeight: '600',
  },
  skillLevel: {
    fontSize: 14,
    fontWeight: '500',
  },
  skillBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  skillProgress: {
    height: '100%',
    borderRadius: 4,
  },
  experienceSection: {
    paddingVertical: 40,
  },
  timeline: {
    gap: 20,
  },
  experienceCard: {
    padding: 20,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  jobPeriod: {
    fontSize: 14,
    fontWeight: '500',
  },
  companyName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  jobDescription: {
    fontSize: 14,
    lineHeight: 20,
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
