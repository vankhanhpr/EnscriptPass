
using System;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using WebApi.data;
using WebApi.serrvice.admin.interfaces;
using WebApi.serrvice.admin.responsitory;
using WebApi.serrvice.authentication;
using WebApi.serrvice.authentication.interfaces;
using WebApi.serrvice.authentication.responsitoty;
using WebApi.serrvice.unit.interfaces;
using WebApi.serrvice.unit.responsitory;
using WebApi.serrvice.user.interfaces;
using WebApi.serrvice.user.responsitory;

namespace WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<MyDBContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true, // có validate Server tạo JWT không ?
                    ValidateAudience = true,
                    ValidateLifetime = true, //có validate expire time hay không ?
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                };
            });
            //set time die token
            services.Configure<DataProtectionTokenProviderOptions>(options =>
            options.TokenLifespan = TimeSpan.FromDays(1));

            services.AddSingleton<IFileProvider>(
               new PhysicalFileProvider(
                   Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/user")));//image
            services.AddSingleton<IFileProvider>(
               new PhysicalFileProvider(
                   Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/files")));//form file
            services.AddSingleton<IFileProvider>(
               new PhysicalFileProvider(
                   Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/card")));//form file
            services.AddSingleton<IFileProvider>(
               new PhysicalFileProvider(
                   Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/decision")));//form file
            services.AddSingleton<IFileProvider>(
              new PhysicalFileProvider(
                  Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/document")));//form file
            services.AddSingleton<IFileProvider>(
              new PhysicalFileProvider(
                  Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/transfer")));//transfer
            services.AddSingleton<IFileProvider>(
              new PhysicalFileProvider(
                  Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/dangviendubi")));//dang vien du bi

            services.AddScoped<IUserResponsitory, UserResponsitory>();
            services.AddScoped<IAuthentication, AuthenticationResponsitory>();
            services.AddScoped<IAdUserResponsitory, AdUserResponsitory>();
            services.AddTransient<IProvinceResponsitory, ProvinceResponsitory>();
            services.AddTransient<IDistrictResponsitory, DistrictResponsitory>();
            services.AddTransient<IWardResponsitory, WardResponsitory>();
            services.AddTransient<IDangBoResponsitory, DangBoResponsitory>();
            services.AddTransient<IChiBoResponsitory, ChiBoResponsitory>();
            services.AddTransient<IOrganizationResponsitory, OrganizationResponsitory>();
            services.AddTransient<ITitleResponsitory, TitleResponsitory>();
            services.AddTransient<IAdFileResponsitory, AdFileResponsitory>();
            services.AddTransient<INationResponsitory, NationResponsitory>();
            services.AddTransient<IAdFamilyResponsitory, AdFamilyResponsitory>();
            services.AddTransient<IAdBonusResponsitory, AdBonusResponsitory>();
            services.AddTransient<IAdDisciplineResponsitory, AdDisciplineResponsitory>();
            services.AddTransient<IAdToabroadResponsitory, AdToabroadResponsitory>();
            services.AddTransient<IAdFormResponsitory, AdFormResponsitory>();
            services.AddTransient<IAdhererLivingResponsitory, AdhererLivingResponsitory>();
            services.AddTransient<IUserMoveResponsitory, UserMoveResponsitory>();
            services.AddTransient<IFormFileResponsitory, FormFileResponsitory>();

            services.AddTransient<IDashBoardResponsitory, DashBoardResponsitory>();
            services.AddTransient<IFinanceResponsitory, FinanceResponsitory>();
            services.AddTransient<IStatisticalResponsitory, StatisticalResponsitory>();
            services.AddTransient<IAdStudyProcessResponsitory, AdStudyProcessResponsitory>();
            services.AddTransient<IAdWorkingProcessResponsitory, AdWorkingProcessResponsitory>();
            services.AddTransient<IHashPass, HashPass>();
            //for user
            services.AddTransient<IFileResponsitory, FileResponsitory>();
            services.AddTransient<IUserResponsitory, UserResponsitory>();
            services.AddTransient<IFormsResponsitory, FormResponsitory>();
            services.AddTransient<IFamilyResponsitory, FamilyResponsitory>();
            services.AddTransient<IToabroadResponsitory, ToabroadResponsitory>();
            services.AddTransient<INationResponsitory, NationResponsitory>();
            services.AddTransient<IBonusResponsitory, BonusResponsitory>();
            services.AddTransient<IDisciplineResponsitory, DisciplineResponsitory>();
            services.AddTransient<IAdStudyProcessResponsitory, AdStudyProcessResponsitory>();
            services.AddTransient<IAdWorkingProcessResponsitory, AdWorkingProcessResponsitory>();
            services.AddCors();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors(builder => builder
                                    .AllowAnyOrigin()
                                    .AllowAnyMethod()
                                    .AllowAnyHeader()
                                    .AllowCredentials());
            app.UseAuthentication();
            app.UseDeveloperExceptionPage();//filter user
            app.UseMvcWithDefaultRoute();///filter user
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseMvc();
        }
    }
}
