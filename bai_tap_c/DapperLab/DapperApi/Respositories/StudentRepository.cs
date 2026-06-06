using Dapper;
using System.Data;
using Microsoft.Data.SqlClient;
using DapperApi.Models;

namespace DapperApi.Repositories;

public class StudentRepository : IStudentRepository
{
    private readonly string _connStr;

    public StudentRepository(IConfiguration config)
    {
        _connStr = config.GetConnectionString("DefaultConnection")!;
    }

    // Tao connection moi moi lan goi
    private IDbConnection NewConnection()
        => new SqlConnection(_connStr);

    // GET ALL
    public IEnumerable<Student> GetAll()
    {
        using var db = NewConnection();
        return db.Query<Student>("SELECT * FROM Students");
    }

    // GET BY ID
    public Student? GetById(int id)
    {
        using var db = NewConnection();
        return db.QuerySingleOrDefault<Student>(
            "SELECT * FROM Students WHERE Id = @Id",
            new { Id = id });
    }

    // CREATE
    public void Create(Student student)
    {
        using var db = NewConnection();
        db.Execute(
            "INSERT INTO Students (Name, Age, Email) VALUES (@Name, @Age, @Email)",
            student);
    }

    // UPDATE
    public void Update(Student student)
    {
        using var db = NewConnection();
        db.Execute(
            "UPDATE Students SET Name=@Name, Age=@Age, Email=@Email WHERE Id=@Id",
            student);
    }

    // DELETE
    public void Delete(int id)
    {
        using var db = NewConnection();
        db.Execute(
            "DELETE FROM Students WHERE Id=@Id",
            new { Id = id });
    }

    // SEARCH BY NAME
    public IEnumerable<Student> SearchByName(string name)
    {
        using var db = NewConnection();
        return db.Query<Student>(
            "SELECT * FROM Students WHERE Name LIKE @Name",
            new { Name = $"%{name}%" });
    }

    public IEnumerable<StudentWithCourses> GetAllWithCourses()
    {
        var sql = @"
            SELECT s.Id, s.Name, c.Id, c.CourseName
            FROM Students s
            JOIN StudentCourses sc ON s.Id = sc.StudentId
            JOIN Courses c ON sc.CourseId = c.Id
            ORDER BY s.Id";

        using var db = NewConnection();

        var dict = new Dictionary<int, StudentWithCourses>();

        db.Query<StudentWithCourses, Course, StudentWithCourses>(
            sql,
            (student, course) =>
            {
                if (!dict.TryGetValue(student.Id, out var existing))
                {
                    existing = student;
                    existing.Courses = new List<Course>(); // Đảm bảo danh sách Courses đã được khởi tạo
                    dict[student.Id] = existing;
                }

                if (course != null)
                {
                    existing.Courses.Add(course);
                }

                return existing;
            },
            splitOn: "Id" // Cột phân tách giữa Student và Course
        );

        return dict.Values;
    }
}