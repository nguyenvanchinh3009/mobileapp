import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
// Sửa import từ lucide-react-native
import { Mail, Lock, Eye, EyeOff, LogIn, Gamepad2, Crown } from 'lucide-react-native';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    if (!email) {
      Alert.alert('Lỗi', 'Vui lòng nhập email!');
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ!');
      return;
    }

    if (!password || password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    console.log('Đăng nhập:', { email, password });
    Alert.alert('Thành công', 'Chào mừng trở lại! 🎮');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Gamepad2 size={28} color="#E5E7EB" />
            </View>
            <View>
              <Text style={styles.logoText}>Game<span style={styles.logoHighlight}>Hub</span></Text>
              <Text style={styles.logoSubtitle}>Premium Gaming Experience</Text>
            </View>
          </View>
          
          <View style={styles.promoBadge}>
            <Crown size={16} color="#F59E0B" />
            <Text style={styles.promoText}>🎁 Tặng 1000 coins khi đăng nhập</Text>
          </View>
        </View>

        {/* Welcome Text */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Chào mừng trở lại, <Text style={styles.welcomeHighlight}>Game Thủ!</Text></Text>
          <Text style={styles.welcomeSubtitle}>Đăng nhập để tiếp tục cuộc phiêu lưu của bạn</Text>
        </View>

        {/* Social Login Buttons */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>hoặc đăng nhập với email</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <Mail size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="your@email.com"
                placeholderTextColor="#6B7280"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <View style={styles.passwordHeader}>
              <Text style={styles.label}>Mật khẩu</Text>
              <TouchableOpacity onPress={() => Alert.alert('Quên mật khẩu')}>
                <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <Lock size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.passwordInput]}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#6B7280"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? 
                  <EyeOff size={20} color="#6B7280" /> : 
                  <Eye size={20} color="#6B7280" />
                }
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember Me */}
          <View style={styles.rememberContainer}>
            <TouchableOpacity 
              style={styles.checkbox}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkboxInner, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <View style={styles.checkmark} />}
              </View>
            </TouchableOpacity>
            <Text style={styles.rememberText}>Ghi nhớ đăng nhập</Text>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
            <Text style={styles.loginButtonText}>Đăng Nhập</Text>
            <LogIn size={20} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Crown size={20} color="#F59E0B" />
              </View>
              <View>
                <Text style={styles.featureTitle}>1000 Coins Miễn Phí</Text>
                <Text style={styles.featureSubtitle}>Khi đăng nhập lần đầu</Text>
              </View>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Gamepad2 size={20} color="#8B5CF6" />
              </View>
              <View>
                <Text style={styles.featureTitle}>500+ Games</Text>
                <Text style={styles.featureSubtitle}>Truy cập game premium</Text>
              </View>
            </View>
          </View>

          {/* Register Link */}
          <TouchableOpacity 
            style={styles.registerLink}
            onPress={() => router.push('/RegisterForm')}
          >
            <Text style={styles.registerText}>
              Chưa có tài khoản? <Text style={styles.registerHighlight}>Đăng ký miễn phí</Text>
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Bằng việc đăng nhập, bạn đồng ý với{' '}
              <Text style={styles.footerLink} onPress={() => Alert.alert('Điều khoản dịch vụ')}>
                Điều khoản dịch vụ
              </Text>
              {' '}và{' '}
              <Text style={styles.footerLink} onPress={() => Alert.alert('Chính sách bảo mật')}>
                Chính sách bảo mật
              </Text>
            </Text>
            <Text style={styles.copyright}>© 2024 GameHub. Made with ❤️ for gamers.</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoIcon: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderWidth: 1,
    borderColor: '#374151',
    padding: 12,
    borderRadius: 16,
    marginRight: 12,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  logoHighlight: {
    color: '#9CA3AF',
  },
  logoSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  promoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderWidth: 1,
    borderColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  promoText: {
    color: '#D1D5DB',
    fontWeight: '500',
    fontSize: 14,
  },
  welcomeSection: {
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  welcomeHighlight: {
    color: '#9CA3AF',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderWidth: 1,
    borderColor: '#374151',
    paddingVertical: 14,
    borderRadius: 12,
  },
  socialButtonText: {
    color: '#D1D5DB',
    fontWeight: '500',
    fontSize: 14,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#374151',
  },
  dividerText: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 12,
  },
  formContainer: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#D1D5DB',
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    color: '#FFFFFF',
    fontSize: 16,
  },
  passwordInput: {
    paddingRight: 40,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPassword: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '500',
  },
  eyeButton: {
    padding: 4,
    position: 'absolute',
    right: 12,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#4B5563',
    borderRadius: 4,
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  checkmark: {
    width: 10,
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  rememberText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#8B5CF6',
    paddingVertical: 18,
    borderRadius: 12,
    marginTop: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  featuresContainer: {
    gap: 12,
    marginTop: 24,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderWidth: 1,
    borderColor: '#374151',
    padding: 16,
    borderRadius: 12,
  },
  featureIcon: {
    backgroundColor: 'rgba(31, 41, 55, 0.9)',
    padding: 10,
    borderRadius: 10,
  },
  featureTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2,
  },
  featureSubtitle: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  registerLink: {
    alignItems: 'center',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#374151',
    marginTop: 24,
  },
  registerText: {
    color: '#9CA3AF',
    fontSize: 16,
  },
  registerHighlight: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    color: '#6B7280',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  footerLink: {
    color: '#8B5CF6',
  },
  copyright: {
    color: '#4B5563',
    fontSize: 12,
    marginTop: 8,
  },
});