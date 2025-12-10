import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Gamepad2, 
  Shield, 
  Lock, 
  UserPlus, 
  LogIn, 
  Sparkles, 
  Star, 
  Key, 
  Users,
  Award,
  Zap,
  X
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function AuthHome() {
  const router = useRouter();

  const authOptions = [
    {
      id: 'login',
      title: 'Đăng Nhập',
      description: 'Đã có tài khoản? Đăng nhập ngay',
      icon: LogIn,
      color: '#8B5CF6',
      onPress: () => router.push('/SignInForm'),
    },
    {
      id: 'register',
      title: 'Đăng Ký',
      description: 'Tạo tài khoản mới, nhận ưu đãi đặc biệt',
      icon: UserPlus,
      color: '#10B981',
      onPress: () => router.push('/RegisterForm'),
    },
    {
      id: 'guest',
      title: 'Khách',
      description: 'Khám phá với tư cách khách',
      icon: Users,
      color: '#F59E0B',
      onPress: () => Alert.alert('Thông báo', 'Chế độ khách đang phát triển'),
    },
  ];

  const features = [
    { icon: Gamepad2, text: '500+ Game Premium', color: '#8B5CF6' },
    { icon: Award, text: 'Nhận ngay 1000 Coins', color: '#F59E0B' },
    { icon: Shield, text: 'Bảo mật tuyệt đối', color: '#10B981' },
    { icon: Zap, text: 'Tốc độ cao', color: '#EC4899' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Layers */}
      <View style={styles.backgroundLayer1} />
      <View style={styles.backgroundLayer2} />
      <View style={styles.backgroundLayer3} />

      {/* Animated Particles Background */}
      <View style={styles.particles}>
        {[...Array(15)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.particle,
              {
                left: Math.random() * width,
                top: Math.random() * height,
                width: Math.random() * 3 + 2,
                height: Math.random() * 3 + 2,
                opacity: Math.random() * 0.4 + 0.1,
              },
            ]}
          />
        ))}
      </View>

      {/* Close Button (X) */}
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => {
          Alert.alert(
            'Thoát ứng dụng', 
            'Bạn có muốn thoát ứng dụng?',
            [
              { text: 'Hủy', style: 'cancel' },
              { text: 'Thoát', style: 'destructive' }
            ]
          );
        }}
      >
        <X size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={[styles.logo, { backgroundColor: '#8B5CF6' }]}>
              <Gamepad2 size={36} color="#FFFFFF" />
            </View>
            <View style={styles.logoTextContainer}>
              <Text style={styles.logoText}>GameHub</Text>
              <Text style={styles.logoSubtitle}>Premium Gaming Platform</Text>
            </View>
          </View>
          
          <View style={styles.securityBadge}>
            <Shield size={16} color="#10B981" />
            <Text style={styles.securityText}>🔒 Bảo mật SSL 256-bit</Text>
          </View>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            Chào mừng đến với{' '}
            <Text style={styles.highlight}>GameHub</Text>
          </Text>
          <Text style={styles.welcomeSubtitle}>
            Nền tảng game số 1 với hàng ngàn tựa game hấp dẫn
          </Text>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: `${feature.color}20` }]}>
                <feature.icon size={20} color={feature.color} />
              </View>
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>

        {/* Auth Options Cards */}
        <View style={styles.authCardsContainer}>
          {authOptions.map((option) => {
            const Icon = option.icon;
            return (
              <TouchableOpacity
                key={option.id}
                style={[styles.authCard, { backgroundColor: option.color }]}
                onPress={option.onPress}
                activeOpacity={0.9}
              >
                <View style={styles.authCardContent}>
                  <View style={styles.authIconContainer}>
                    <Icon size={28} color="#FFFFFF" />
                  </View>
                  <Text style={styles.authCardTitle}>{option.title}</Text>
                  <Text style={styles.authCardDescription}>
                    {option.description}
                  </Text>
                  
                  {/* Decorative Elements */}
                  <View style={styles.cardSparkle1}>
                    <Sparkles size={12} color="#FFFFFF" />
                  </View>
                  <View style={styles.cardSparkle2}>
                    <Star size={10} color="#FFFFFF" />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => router.push('/forgotpassword')}
          >
            <Key size={18} color="#8B5CF6" />
            <Text style={styles.quickActionText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          
          <View style={styles.divider} />
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => Alert.alert('Trợ giúp', 'Liên hệ hỗ trợ: support@gamehub.com')}
          >
            <Shield size={18} color="#10B981" />
            <Text style={styles.quickActionText}>Trợ giúp & Hỗ trợ</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Banner */}
        <View style={styles.statsBanner}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1M+</Text>
            <Text style={styles.statLabel}>Người chơi</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Tựa game</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.9★</Text>
            <Text style={styles.statLabel}>Đánh giá</Text>
          </View>
        </View>

        {/* Terms & Privacy */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            Bằng việc sử dụng GameHub, bạn đồng ý với{' '}
            <Text style={styles.termsLink}>Điều khoản dịch vụ</Text>{' '}
            và{' '}
            <Text style={styles.termsLink}>Chính sách bảo mật</Text>
          </Text>
          
          <View style={styles.ageWarning}>
            <Text style={styles.ageWarningText}>⚠️ Dành cho người từ 13+ tuổi</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.copyright}>© 2024 GameHub. All rights reserved.</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  backgroundLayer1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0F172A',
  },
  backgroundLayer2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1E293B',
    opacity: 0.7,
  },
  backgroundLayer3: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#334155',
    opacity: 0.3,
  },
  particles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  particle: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 60,
    zIndex: 100,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 12,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoTextContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  logoSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 8,
  },
  securityText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '500',
  },
  welcomeSection: {
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: 42,
  },
  highlight: {
    color: '#8B5CF6',
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: '#94A3B8',
    lineHeight: 24,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
    minWidth: '48%',
    gap: 12,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    flex: 1,
    fontSize: 12,
    color: '#E2E8F0',
    fontWeight: '500',
  },
  authCardsContainer: {
    gap: 20,
    marginBottom: 32,
  },
  authCard: {
    height: 140,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  authCardContent: {
    flex: 1,
    padding: 24,
    position: 'relative',
  },
  authIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  authCardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  authCardDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    maxWidth: '80%',
  },
  cardSparkle1: {
    position: 'absolute',
    top: 16,
    right: 16,
    opacity: 0.6,
  },
  cardSparkle2: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    opacity: 0.6,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    gap: 16,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'center',
  },
  quickActionText: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  statsBanner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 8,
  },
  termsContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  termsText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  termsLink: {
    color: '#8B5CF6',
    fontWeight: '500',
  },
  ageWarning: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  ageWarningText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  copyright: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 8,
  },
  version: {
    fontSize: 10,
    color: '#6B7280',
    fontStyle: 'italic',
  },
});