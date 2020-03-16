using Microsoft.EntityFrameworkCore;
using WebApi.model;
using WebApi.serrvice.admin.model;
using WebApi.controllers.values;
using AdhererClassLib.area.main;

namespace WebApi.data
{
    public class MyDBContext : DbContext
    {
        public MyDBContext(DbContextOptions<MyDBContext> options) : base(options)
        {
        }
        public DbSet<Users> Users { get; set; }
        public DbSet<Files> Files { get; set; }
        public DbSet<DangBo> Dangbo { get; set; }
        public DbSet<ChiBo> Chibo { get; set; }
        public DbSet<Nation> Nation { get; set; }
        public DbSet<Province> devvn_tinhthanhpho { get; set; }
        public DbSet<District> devvn_quanhuyen { get; set; }
        public DbSet<Ward> devvn_xaphuongthitran { get; set; }
        public DbSet<Bonus> Bonus { get; set; }
        public DbSet<Forms> Forms { get; set; }
        public DbSet<Family> Family { get; set; }
        public DbSet<Toabroad> Toabroad { get;set;}
        public DbSet<Discipline> Discipline { get; set; }
        public DbSet<Report> Report { get; set; }
        public DbSet<Organization> Organization { get; set; }
        public DbSet<Title> Title { get; set; }
        public DbSet<AdhererLiving> AdhererLiving { get; set; }
        public DbSet<Finance> Finance { get; set; }
        public DbSet<UserMove> UserMove { get; set; }
        public DbSet<FormFile> FormFile { get; set; }
        public DbSet<StudyProcess> StudyProcess { get; set; }
        public DbSet<WorkingProcess> WorkingProcess { get; set; }
        public DbSet<Test> Test { get; set; }
    }
}
