﻿using AutoMapper;
using A4KPI.Data;
using A4KPI.DTO;
using A4KPI.Models;
using A4KPI.Services.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace A4KPI.Services
{
    public interface ISettingMonthService : IServiceBase<SettingMonthly, SettingMonthlyDto>
    {
        Task<OperationResult> AddCustom(SettingMonthlyDto model);
    }
    public class SettingMonthService : ServiceBase<SettingMonthly, SettingMonthlyDto>, ISettingMonthService
    {
        private readonly IRepositoryBase<SettingMonthly> _repo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public SettingMonthService(
            IRepositoryBase<SettingMonthly> repo, 
            IUnitOfWork unitOfWork,
            IMapper mapper, 
            MapperConfiguration configMapper
            )
            : base(repo, unitOfWork, mapper,  configMapper)
        {
            _repo = repo;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _configMapper = configMapper;
        }

        public async Task<OperationResult> AddCustom(SettingMonthlyDto model)
        {
            throw new NotImplementedException();
        }
    }
}
