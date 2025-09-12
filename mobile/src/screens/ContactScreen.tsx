import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Section } from '../components/Section';
import { useTheme } from '../theme/ThemeProvider';

export const ContactScreen = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      title: 'Email',
      value: 'hello@saaeed.dev',
      action: () => Linking.openURL('mailto:hello@saaeed.dev'),
      color: theme.colors.primary,
    },
    {
      title: 'LinkedIn',
      value: 'linkedin.com/in/saaeed',
      action: () => Linking.openURL('https://linkedin.com/in/saaeed'),
      color: theme.colors.accent,
    },
    {
      title: 'GitHub',
      value: 'github.com/saaeed',
      action: () => Linking.openURL('https://github.com/saaeed'),
      color: theme.colors.secondary,
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Message Sent!', 
        'Thank you for your message. I\'ll get back to you soon.',
        [{ text: 'OK', onPress: () => setFormData({ name: '', email: '', subject: '', message: '' }) }]
      );
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    // In a real app, you'd use Clipboard from @react-native-clipboard/clipboard
    Alert.alert('Copied!', `${text} copied to clipboard`);
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
          <Text style={[styles.heroTitle, { color: theme.colors.foreground }]}>
            Get In Touch
          </Text>
          <Text style={[styles.heroSubtitle, { color: theme.colors.mutedForeground }]}>
            Let's discuss your next project and bring your vision to life
          </Text>
        </MotiView>
      </Section>

      {/* Contact Methods */}
      <Section style={styles.contactMethodsSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 200 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
            Contact Information
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.mutedForeground }]}>
            Choose your preferred way to reach out
          </Text>
        </MotiView>

        <View style={styles.contactMethods}>
          {contactMethods.map((method, index) => (
            <MotiView
              key={method.title}
              from={{ opacity: 0, translateY: 30 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 400, delay: 400 + index * 100 }}
            >
              <Card variant="glass" style={styles.contactMethodCard}>
                <TouchableOpacity 
                  style={styles.contactMethodButton}
                  onPress={method.action}
                  onLongPress={() => copyToClipboard(method.value)}
                >
                  <View style={[styles.contactIcon, { backgroundColor: method.color + '20' }]}>
                    <Text style={[styles.contactIconText, { color: method.color }]}>
                      {method.title.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.contactInfo}>
                    <Text style={[styles.contactTitle, { color: theme.colors.foreground }]}>
                      {method.title}
                    </Text>
                    <Text style={[styles.contactValue, { color: theme.colors.mutedForeground }]}>
                      {method.value}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Card>
            </MotiView>
          ))}
        </View>
      </Section>

      {/* Contact Form */}
      <Section style={styles.formSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 600 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
            Send a Message
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.mutedForeground }]}>
            Fill out the form below and I'll get back to you
          </Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 800 }}
        >
          <Card variant="glass" style={styles.formCard}>
            <Input
              label="Name *"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Your full name"
            />
            
            <Input
              label="Email *"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="your.email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Input
              label="Subject"
              value={formData.subject}
              onChangeText={(value) => handleInputChange('subject', value)}
              placeholder="What's this about?"
            />
            
            <Input
              label="Message *"
              value={formData.message}
              onChangeText={(value) => handleInputChange('message', value)}
              placeholder="Tell me about your project..."
              multiline
              numberOfLines={4}
              style={styles.messageInput}
            />

            <Button
              title={isSubmitting ? "Sending..." : "Send Message"}
              variant="neon"
              size="lg"
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting}
              style={styles.submitButton}
            />
          </Card>
        </MotiView>
      </Section>

      {/* Quick Actions */}
      <Section style={styles.quickActionsSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 1000 }}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>
            Quick Actions
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.mutedForeground }]}>
            Common ways to connect
          </Text>
        </MotiView>

        <View style={styles.quickActions}>
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 400, delay: 1200 }}
          >
            <Button
              title="Schedule a Call"
              variant="primary"
              size="lg"
              onPress={() => Linking.openURL('https://calendly.com/saaeed')}
              style={styles.quickActionButton}
            />
          </MotiView>
          
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 400, delay: 1400 }}
          >
            <Button
              title="Download Resume"
              variant="outline"
              size="lg"
              onPress={() => Linking.openURL('https://saaeed.dev/resume.pdf')}
              style={styles.quickActionButton}
            />
          </MotiView>
        </View>
      </Section>

      {/* Response Time */}
      <Section style={styles.responseTimeSection}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 1600 }}
        >
          <Card variant="glass" style={styles.responseTimeCard}>
            <Text style={[styles.responseTimeTitle, { color: theme.colors.foreground }]}>
              Response Time
            </Text>
            <Text style={[styles.responseTimeText, { color: theme.colors.mutedForeground }]}>
              I typically respond to messages within 24 hours. For urgent matters, 
              feel free to reach out via email or LinkedIn.
            </Text>
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
  contactMethodsSection: {
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
  contactMethods: {
    gap: 16,
  },
  contactMethodCard: {
    padding: 0,
    overflow: 'hidden',
  },
  contactMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactIconText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
  },
  formSection: {
    paddingVertical: 40,
  },
  formCard: {
    padding: 24,
  },
  messageInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 16,
  },
  quickActionsSection: {
    paddingVertical: 40,
  },
  quickActions: {
    gap: 16,
  },
  quickActionButton: {
    marginBottom: 8,
  },
  responseTimeSection: {
    paddingVertical: 40,
  },
  responseTimeCard: {
    padding: 24,
    alignItems: 'center',
  },
  responseTimeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  responseTimeText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
