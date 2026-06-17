import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Đăng ký:', { email, username, password });
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h1 style={styles.title}>Đăng ký TuneVault</h1>
        
        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email của bạn</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email" style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Tên hồ sơ</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nhập tên người dùng" style={styles.input} required />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Tạo mật khẩu</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tạo mật khẩu" style={styles.input} required />
          </div>

          <button type="submit" style={styles.submitBtn}>Đăng ký</button>
        </form>

        <p style={styles.footerText}>
          Đã có tài khoản? <Link to="/login" style={styles.link}>Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

// Copy lại toàn bộ const styles = { ... } từ file Login.tsx ở trên xuống đây.
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

export default Register;