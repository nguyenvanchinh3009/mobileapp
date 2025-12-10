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
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle, Send, Shield, Clock, AlertCircle } from 'lucide-react-native';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState<'email' | 'code' | 'password' | 'success'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const router = useRouter();

  // Timer for resend code
  React.useEffect(() => {
    if (step === 'code' && resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer, step]);

  const handleSendCode = () => {
    if (!email) {
      Alert.alert('Lỗi', 'Vui lòng nhập email!');
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ!');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('code');
      setResendTimer(60);
      Alert.alert('Thành công', 'Mã xác nhận 6 số đã được gửi đến email của bạn!\nVui lòng kiểm tra hộp thư.');
    }, 1500);
  };

  const handleResendCode = () => {
    if (resendTimer > 0) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResendTimer(60);
      Alert.alert('Thành công', 'Mã mới đã được gửi!');
    }, 1000);
  };

  const handleVerifyCode = () => {
    if (!verificationCode) {
      Alert.alert('Lỗi', 'Vui lòng nhập mã xác nhận!');
      return;
    }

    if (verificationCode.length !== 6) {
      Alert.alert('Lỗi', 'Mã xác nhận phải có 6 chữ số!');
      return;
    }

    // Mock verification - in real app, verify with backend
    if (verificationCode === '123456') {
      setStep('password');
    } else {
      Alert.alert('Lỗi', 'Mã xác nhận không đúng!');
    }
  };

  const handleResetPassword = () => {
    if (!agreeTerms) {
      Alert.alert('Lỗi', 'Vui lòng đồng ý với điều khoản và chính sách!');
      return;
    }

    if (!newPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu mới!');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 8 ký tự!');
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)/;
    if (!passwordRegex.test(newPassword)) {
      Alert.alert('Lỗi', 'Mật khẩu phải bao gồm cả chữ và số!');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu không khớp!');
      return;
    }

    setIsLoading(true);
    // Simulate reset password
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      Alert.alert('Thành công', 'Mật khẩu đã được đặt lại!');
    }, 2000);
  };

  const renderEmailStep = () => (
    <View style={styles.formContainer}>
      <Text style={styles.stepTitle}>Bước 1: Xác nhận email</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email đăng ký tài khoản</Text>
        <View style={styles.inputWrapper}>
          <Mail size={20} color="#6B7280" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="nhập email của bạn"
            placeholderTextColor="#6B7280"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>

      <View style={styles.infoBox}>
        <AlertCircle size={18} color="#F59E0B" />
        <Text style={styles.infoText}>
          Chúng tôi sẽ gửi mã xác nhận 6 số đến email này để xác minh tài khoản.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
        onPress={handleSendCode}
        disabled={isLoading}
      >
        <Text style={styles.submitButtonText}>
          {isLoading ? 'Đang gửi...' : 'Gửi mã xác nhận'}
        </Text>
        <Send size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  const renderCodeStep = () => (
    <View style={styles.formContainer}>
      <Text style={styles.stepTitle}>Bước 2: Nhập mã xác nhận</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mã xác nhận 6 số</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, styles.codeInput]}
            value={verificationCode}
            onChangeText={setVerificationCode}
            placeholder="000000"
            placeholderTextColor="#6B7280"
            keyboardType="number-pad"
            maxLength={6}
            textAlign="center"
          />
        </View>
        <Text style={styles.codeHint}>Đã gửi đến: {email}</Text>
      </View>

      <View style={styles.timerContainer}>
        <Clock size={16} color="#9CA3AF" />
        <Text style={styles.timerText}>
          {resendTimer > 0 
            ? `Gửi lại mã sau ${resendTimer}s` 
            : 'Bạn chưa nhận được mã?'}
        </Text>
        {resendTimer === 0 && (
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={styles.resendLink}>Gửi lại mã</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
        onPress={handleVerifyCode}
        disabled={isLoading}
      >
        <Text style={styles.submitButtonText}>
          {isLoading ? 'Đang xác nhận...' : 'Xác nhận mã'}
        </Text>
        <CheckCircle size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  const renderPasswordStep = () => (
    <View style={styles.formContainer}>
      <Text style={styles.stepTitle}>Bước 3: Đặt mật khẩu mới</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mật khẩu mới</Text>
        <View style={styles.inputWrapper}>
          <Lock size={20} color="#6B7280" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, styles.passwordInput]}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="ít nhất 8 ký tự"
            placeholderTextColor="#6B7280"
            secureTextEntry={!showNewPassword}
          />
          <TouchableOpacity
            onPress={() => setShowNewPassword(!showNewPassword)}
            style={styles.eyeButton}
          >
            {showNewPassword ? (
              <EyeOff size={20} color="#6B7280" />
            ) : (
              <Eye size={20} color="#6B7280" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
        <View style={styles.inputWrapper}>
          <Lock size={20} color="#6B7280" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, styles.passwordInput]}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="nhập lại mật khẩu"
            placeholderTextColor="#6B7280"
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeButton}
          >
            {showConfirmPassword ? (
              <EyeOff size={20} color="#6B7280" />
            ) : (
              <Eye size={20} color="#6B7280" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Terms & Conditions */}
      <View style={styles.termsContainer}>
        <TouchableOpacity 
          style={styles.checkbox}
          onPress={() => setAgreeTerms(!agreeTerms)}
        >
          <View style={[styles.checkboxInner, agreeTerms && styles.checkboxChecked]}>
            {agreeTerms && <View style={styles.checkmark} />}
          </View>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          Tôi đồng ý với{' '}
          <Text 
            style={styles.link} 
            onPress={() => Linking.openURL('https://example.com/terms')}
          >
            Điều khoản dịch vụ
          </Text>
          {' '}và{' '}
          <Text 
            style={styles.link} 
            onPress={() => Linking.openURL('https://example.com/privacy')}
          >
            Chính sách bảo mật
          </Text>{' '}
          của GameHub khi đặt lại mật khẩu
        </Text>
      </View>

      {/* Security Requirements */}
      <View style={styles.securityCard}>
        <Shield size={20} color="#8B5CF6" />
        <View style={styles.securityContent}>
          <Text style={styles.securityTitle}>Yêu cầu bảo mật:</Text>
          <Text style={styles.securityItem}>✓ Ít nhất 8 ký tự</Text>
          <Text style={styles.securityItem}>✓ Bao gồm chữ và số</Text>
          <Text style={styles.securityItem}>✓ Không sử dụng mật khẩu cũ</Text>
          <Text style={styles.securityItem}>✓ Không chứa thông tin cá nhân</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, (!agreeTerms || isLoading) && styles.submitButtonDisabled]}
        onPress={handleResetPassword}
        disabled={!agreeTerms || isLoading}
      >
        <Text style={styles.submitButtonText}>
          {isLoading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
        </Text>
        <CheckCircle size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  const renderSuccessStep = () => (
    <View style={styles.successContainer}>
      <View style={styles.successIcon}>
        <CheckCircle size={60} color="#10B981" />
      </View>
      <Text style={styles.successTitle}>Thành công!</Text>
      <Text style={styles.successMessage}>
        Mật khẩu của bạn đã được đặt lại thành công.
        {'\n'}Vui lòng đăng nhập lại với mật khẩu mới.
      </Text>
      
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.push('/SignInForm')}
      >
        <Text style={styles.loginButtonText}>Đăng nhập ngay</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/')}
      >
        <Text style={styles.backButtonText}>Về trang chủ</Text>
      </TouchableOpacity>
    </View>
  );

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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (step === 'email') {
                router.push('/SignInForm');
              } else if (step === 'code') {
                setStep('email');
              } else if (step === 'password') {
                setStep('code');
              } else {
                router.push('/SignInForm');
              }
            }}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Quên mật khẩu</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Progress Steps */}
        <View style={styles.progressContainer}>
          {['email', 'code', 'password', 'success'].map((s, index) => (
            <React.Fragment key={s}>
              <View style={styles.progressStep}>
                <View
                  style={[
                    styles.progressDot,
                    step === s && styles.progressDotActive,
                    (step === 'code' && s === 'email') && styles.progressDotCompleted,
                    (step === 'password' && (s === 'email' || s === 'code')) && styles.progressDotCompleted,
                    (step === 'success') && styles.progressDotCompleted,
                  ]}
                >
                  <Text style={[
                    styles.progressNumber,
                    (step === s || step === 'success' || 
                     (step === 'code' && s === 'email') || 
                     (step === 'password' && (s === 'email' || s === 'code'))) && 
                    styles.progressNumberActive
                  ]}>
                    {index + 1}
                  </Text>
                </View>
                <Text style={[
                  styles.progressLabel,
                  step === s && styles.progressLabelActive
                ]}>
                  {s === 'email' ? 'Email' : 
                   s === 'code' ? 'Mã xác nhận' : 
                   s === 'password' ? 'Mật khẩu' : 'Hoàn tất'}
                </Text>
              </View>
              {index < 3 && <View style={styles.progressLine} />}
            </React.Fragment>
          ))}
        </View>

        {/* Current Step Content */}
        {step === 'email' && renderEmailStep()}
        {step === 'code' && renderCodeStep()}
        {step === 'password' && renderPasswordStep()}
        {step === 'success' && renderSuccessStep()}

        {/* Help Section */}
        {step !== 'success' && (
          <View style={styles.helpContainer}>
            <Text style={styles.helpTitle}>Cần hỗ trợ?</Text>
            <Text style={styles.helpText}>
              Liên hệ bộ phận hỗ trợ:{' '}
              <Text 
                style={styles.helpLink}
                onPress={() => Linking.openURL('mailto:support@gamehub.com')}
              >
                support@gamehub.com
              </Text>
            </Text>
            <Text style={styles.helpText}>
              Hotline:{' '}
              <Text 
                style={styles.helpLink}
                onPress={() => Linking.openURL('tel:19001001')}
              >
                1900 1001
              </Text>
              {' '}(8:00 - 22:00)
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 GameHub. Made with ❤️ for gamers.
          </Text>
          <Text style={styles.footerNote}>
            Quá trình đặt lại mật khẩu được bảo mật bằng mã hóa SSL
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  progressStep: {
    alignItems: 'center',
    minWidth: 70,
  },
  progressDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderWidth: 2,
    borderColor: '#4B5563',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressDotActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  progressDotCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  progressNumber: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
  },
  progressNumberActive: {
    color: '#FFFFFF',
  },
  progressLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },
  progressLabelActive: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#4B5563',
    marginHorizontal: 4,
    marginTop: -18,
  },
  formContainer: {
    gap: 24,
    marginBottom: 40,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
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
  codeInput: {
    letterSpacing: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
  passwordInput: {
    paddingRight: 40,
  },
  codeHint: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  eyeButton: {
    padding: 4,
    position: 'absolute',
    right: 12,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  infoText: {
    flex: 1,
    color: '#FEF3C7',
    fontSize: 14,
    lineHeight: 20,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  timerText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  resendLink: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#8B5CF6',
    paddingVertical: 18,
    borderRadius: 12,
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#6B7280',
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
    gap: 12,
  },
  checkbox: {
    marginTop: 2,
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
  termsText: {
    flex: 1,
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 18,
  },
  link: {
    color: '#8B5CF6',
    fontWeight: '500',
  },
  securityCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginTop: 8,
  },
  securityContent: {
    flex: 1,
  },
  securityTitle: {
    color: '#D1D5DB',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  securityItem: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 4,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    marginBottom: 40,
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  successMessage: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  loginButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    minWidth: 200,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  backButton: {
    paddingVertical: 12,
  },
  backButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
  },
  helpContainer: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
  },
  helpTitle: {
    color: '#D1D5DB',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  helpText: {
    color: '#9CA3AF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  helpLink: {
    color: '#8B5CF6',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    color: '#4B5563',
    fontSize: 12,
    marginBottom: 8,
  },
  footerNote: {
    color: '#6B7280',
    fontSize: 10,
    fontStyle: 'italic',
  },
});