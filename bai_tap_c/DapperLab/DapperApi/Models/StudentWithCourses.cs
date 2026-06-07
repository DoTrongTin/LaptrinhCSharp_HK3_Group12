namespace DapperApi.Models;

public class StudentWithCourses
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public List<Course>? Courses { get; set; }
}