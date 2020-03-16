using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.data;
using WebApi.interfaces.responsitory;

namespace WebApi.responsitory
{
    public class Responsitory<T> : IResponsitory<T> where T : class
    {
        protected readonly MyDBContext context;
        public Responsitory(MyDBContext context)
        {
            this.context = context;
        }
        protected void Save() => context.SaveChanges();
        public int Count(Func<T, bool> predicate)
        {
            return context.Set<T>().Where(predicate).Count();
        }
        public void Create(T entity)
        {
            context.Add(entity);
            Save();
        }
        public void Delete(T entity)
        {
            context.Remove(entity);
            Save();
        }
        public IEnumerable<T> Find(Func<T, bool> predicate)
        {
            return context.Set<T>().Where(predicate);
        }
        public IEnumerable<T> GetAllWidthProducts()
        {
            return context.Set<T>();
        }
        public T GetById(int id)
        {
            return context.Set<T>().Find(id);
        }
        public void Update(T entity)
        {
            context.Update(entity);
            Save();
        }
    }
}
