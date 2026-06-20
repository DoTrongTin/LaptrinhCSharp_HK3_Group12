import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Thêm state xử lý loading và hiển thị lỗi
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Xóa lỗi cũ trước khi thử lại
    setIsLoading(true);

    try {
      // Gọi API thực tế
      await authService.login({ email, password });
      
      // Thành công -> Chuyển hướng về trang chủ
      navigate('/');
    } catch (err: unknown) {
      // Bắt lỗi từ Backend trả về (nếu có)
      // Narrow the unknown error to expected shape without using `any`
      const e = err as { response?: { data?: { message?: string } } } | undefined;
      const errorMessage = e?.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h1 style={styles.title}>Đăng nhập vào TuneVault</h1>
        
        {/* Khối hiển thị lỗi đỏ nếu có */}
        {error && <div style={styles.errorBox}>{error}</div>}
        
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email hoặc tên người dùng</label>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email hoặc tên người dùng"
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Mật khẩu</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              style={styles.input}
              required
            />
          </div>

          <button 
            type="submit" 
            style={{ 
              ...styles.submitBtn, 
              opacity: isLoading ? 0.7 : 1, 
              cursor: isLoading ? 'not-allowed' : 'pointer' 
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>

        <p style={styles.footerText}>
          Chưa có tài khoản? <Link to="/register" style={styles.link}>Đăng ký TuneVault</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff' },
  formBox: { backgroundColor: '#121212', padding: '60px', borderRadius: '8px', width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column' as const, alignItems: 'center' },
  title: { fontSize: '32px', fontWeight: 800, marginBottom: '30px', textAlign: 'center' as const },
  
  // Style mới cho hộp thoại báo lỗi
  errorBox: { width: '100%', backgroundColor: '#e22134', color: '#ffffff', padding: '12px 16px', borderRadius: '4px', marginBottom: '20px', fontSize: '14px', fontWeight: 500, textAlign: 'center' as const },
  
  form: { width: '100%', display: 'flex', flexDirection: 'column' as const, gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column' as const, gap: '8px' },
  label: { fontSize: '14px', fontWeight: 700 },
  input: { padding: '14px', borderRadius: '4px', border: '1px solid #727272', backgroundColor: '#121212', color: 'white', fontSize: '16px', outline: 'none' },
  submitBtn: { marginTop: '20px', padding: '14px', borderRadius: '500px', border: 'none', backgroundColor: '#1db954', color: '#000000', fontSize: '16px', fontWeight: 700, transition: 'opacity 0.2s' },
  footerText: { marginTop: '40px', color: '#a7a7a7', fontSize: '14px' },
  link: { color: '#ffffff', textDecoration: 'underline', fontWeight: 700 }
};

export default Login;