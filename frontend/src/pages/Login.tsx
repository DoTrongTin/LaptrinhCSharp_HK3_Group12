import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Tạm thời mock đăng nhập thành công
    console.log('Đăng nhập với:', email, password);
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h1 style={styles.title}>Đăng nhập vào TuneVault</h1>
        
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

          <button type="submit" style={styles.submitBtn}>Đăng nhập</button>
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
  title: { fontSize: '32px', fontWeight: 800, marginBottom: '40px', textAlign: 'center' as const },
  form: { width: '100%', display: 'flex', flexDirection: 'column' as const, gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column' as const, gap: '8px' },
  label: { fontSize: '14px', fontWeight: 700 },
  input: { padding: '14px', borderRadius: '4px', border: '1px solid #727272', backgroundColor: '#121212', color: 'white', fontSize: '16px', outline: 'none' },
  submitBtn: { marginTop: '20px', padding: '14px', borderRadius: '500px', border: 'none', backgroundColor: '#1db954', color: '#000000', fontSize: '16px', fontWeight: 700, cursor: 'pointer' },
  footerText: { marginTop: '40px', color: '#a7a7a7', fontSize: '14px' },
  link: { color: '#ffffff', textDecoration: 'underline', fontWeight: 700 }
};

export default Login;